using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Code4Ro.CoViz19.Api.Commands;
using Code4Ro.CoViz19.Api.Commands.V2;
using Code4Ro.CoViz19.Api.Models.V2;
using Code4Ro.CoViz19.Api.Services;
using Code4Ro.CoViz19.Models.ParsedPdfModels;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage.Blob.Protocol;

namespace Code4Ro.CoViz19.Api.Handlers
{
    public class FrontendDataQueryHandler : IRequestHandler<GetDailyStatsV2, DailyStatsV2Model>,
        IRequestHandler<GetLatestDataV2, HistoricalPdfStats>,
        IRequestHandler<GetAgeHistogramV2, AgeHistogramV2Model>,
        IRequestHandler<GetGenderStatsV2, GenderStatsV2Model>,
        IRequestHandler<GetQuickstatsV2Data, QuickStatsV2Model>

    {
        private readonly IDataProviderService _dataService;
        private readonly ILogger<FrontendDataQueryHandler> _logger;

        public FrontendDataQueryHandler(IDataProviderService dataService, ILogger<FrontendDataQueryHandler> logger)
        {
            _dataService = dataService;
            _logger = logger;
        }
        public async Task<DailyStatsV2Model> Handle(GetDailyStatsV2 request, CancellationToken cancellationToken)
        {
            var currentData = await _dataService.GetCurrentPdfData();
            if (currentData?.CurrentDayStats == null)
            {
                return null;
            }

            DailyStatsV2Model response = new DailyStatsV2Model()
            {
                CurrentDay = MapToDailyStats(currentData.CurrentDayStats)
            };

            if (currentData.HistoricalData != null)
            {
                var mappedLists = currentData.HistoricalData.Values
                    .OrderBy(x => x.ParsedOn)
                    .Select(MapToDailyStats)
                    .ToList();

                mappedLists.Insert(0, new DailyStats());
                mappedLists.Add(response.CurrentDay);

                response.History = mappedLists
                    .Select((el, i) => new { index = i, data = el })
                    .Where(x => x.index > 0)
                    .Select(x => GetDailyStatsDiff(x.data, mappedLists[x.index - 1]))
                    .Skip(1)
                    .ToArray();
            }

            return response;
        }

        private static DailyStats GetDailyStatsDiff(DailyStats currentDay, DailyStats previousDay)
        {
            var day = new DailyStats
            {
                Cured = currentDay.Cured - previousDay.Cured,
                AverageAge = currentDay.AverageAge,
                DatePublished = currentDay.DatePublished,
                DatePublishedString = currentDay.DatePublishedString,
                Deaths = currentDay.Deaths - previousDay.Deaths,
                Infected = currentDay.Infected - previousDay.Infected
            };

            return day;
        }

        private static DailyStats MapToDailyStats(DailyPdfStats currentData)
        {
            return new DailyStats()
            {
                Cured = currentData.NumberCured,
                DatePublished = currentData.ParsedOn,
                DatePublishedString = currentData.ParsedOnString,
                Deaths = currentData.NumberDeceased,
                Infected = currentData.NumberInfected,
                AverageAge = currentData.AverageAge
            };
        }

        public async Task<HistoricalPdfStats> Handle(GetLatestDataV2 request, CancellationToken cancellationToken)
        {
            return await _dataService.GetCurrentPdfData();
        }

        public async Task<AgeHistogramV2Model> Handle(GetAgeHistogramV2 request, CancellationToken cancellationToken)
        {
            var currentPdfData = await _dataService.GetCurrentPdfData();
            var response = new AgeHistogramV2Model()
            {
                Histogram = new Dictionary<AgeRange, int>()
            };

            if (currentPdfData?.CurrentDayStats != null)
            {
                response.DatePublished = currentPdfData.CurrentDayStats.ParsedOn;
                response.DatePublishedString = currentPdfData.CurrentDayStats.ParsedOnString;
                response.Histogram = currentPdfData.CurrentDayStats.DistributionByAge;
                response.Total = currentPdfData.CurrentDayStats.DistributionByAge.Sum(x => x.Value);
            }


            return response;
        }

        public async Task<GenderStatsV2Model> Handle(GetGenderStatsV2 request, CancellationToken cancellationToken)
        {
            var currentPdfData = await _dataService.GetCurrentPdfData();
            var response = new GenderStatsV2Model();

            if (currentPdfData?.CurrentDayStats != null)
            {
                response.DatePublished = currentPdfData.CurrentDayStats.ParsedOn;
                response.DatePublishedString = currentPdfData.CurrentDayStats.ParsedOnString;
                var percentageOfChildren = currentPdfData.CurrentDayStats.PercentageOfChildren;
                var percentageOfMen = currentPdfData.CurrentDayStats.PercentageOfMen;
                var percentageOfWomen = currentPdfData.CurrentDayStats.PercentageOfWomen;

                response.PercentageOfChildren = percentageOfChildren;
                response.PercentageOfMen = percentageOfMen;
                response.PercentageOfWomen = percentageOfWomen;
                response.TotalPercentage = percentageOfChildren + percentageOfWomen + percentageOfMen;
                response.TotalNumber = currentPdfData.CurrentDayStats.NumberInfected;
            }

            return response;
        }

        public async Task<QuickStatsV2Model> Handle(GetQuickstatsV2Data request, CancellationToken cancellationToken)
        {
            var currentPdfData = await _dataService.GetCurrentPdfData();
            var response = new QuickStatsV2Model()
            {
                History = new InfectionsStatsV2Model[0],
                Totals = new InfectionsStatsV2Model()
            };
            if (currentPdfData?.CurrentDayStats == null)
            {
                return response;
            }

            response.Totals = MapToInfectionsStatsV2Model(currentPdfData.CurrentDayStats);

            var history = currentPdfData.HistoricalData?
                     .Select(x => x.Value)
                     .Select(MapToInfectionsStatsV2Model)
                     .ToList() ?? new List<InfectionsStatsV2Model>();

            history.Add(response.Totals);

            response.History = history.OrderBy(x => x.Date).Skip(1).ToArray();

            return response;
        }

        private InfectionsStatsV2Model MapToInfectionsStatsV2Model(DailyPdfStats data)
        {
            var response = new InfectionsStatsV2Model();
            response.DateString = data.ParsedOnString;
            response.Date = data.ParsedOn;
            response.Cured = data.NumberCured;
            response.Deaths = data.NumberDeceased;
            response.Confirmed = data.NumberInfected;

            return response;
        }
    }
}
