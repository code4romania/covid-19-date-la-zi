using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Api.Commands;
using Code4Ro.CoViz19.Api.Commands.V2;
using Code4Ro.CoViz19.Api.Models.V2;
using Code4Ro.CoViz19.Api.Services;
using Code4Ro.CoViz19.Models.ParsedPdfModels;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Code4Ro.CoViz19.Api.Handlers
{
    public class FrontendDataQueryHandler : IRequestHandler<GetDailyStatsV2, DailyStatsV2Model>,
        IRequestHandler<GetLatestDataV2, HistoricalPdfStats>,
        IRequestHandler<GetGenderAgeHistogramV2, GenderAgeHistogramV2Model>,
        IRequestHandler<GetGenderStatsV2, GenderStatsV2Model>

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

            if (currentData?.HistoricalData != null)
            {
                response.History = currentData.HistoricalData.Values.Select(MapToDailyStats).ToArray();
            }
            return response;
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

        public async Task<GenderAgeHistogramV2Model> Handle(GetGenderAgeHistogramV2 request, CancellationToken cancellationToken)
        {
            var currentPdfData = await _dataService.GetCurrentPdfData();
            var response = new GenderAgeHistogramV2Model()
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
                var numberOfChildren = currentPdfData.CurrentDayStats.NumberOfChildren;
                var numberOfMen = currentPdfData.CurrentDayStats.NumberOfMen;
                var numberOfWomen = currentPdfData.CurrentDayStats.NumberOfWomen;

                response.Children = numberOfChildren;
                response.Men = numberOfMen;
                response.Women = numberOfWomen;
                response.Total = numberOfChildren + numberOfMen + numberOfWomen;
            }

            return response;
        }
    }
}
