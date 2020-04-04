using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Api.Commands.V2;
using Code4Ro.CoViz19.Api.Models.V2;
using Code4Ro.CoViz19.Api.Services;
using Code4Ro.CoViz19.Api.StaticData;
using Code4Ro.CoViz19.Models.ParsedPdfModels;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Code4Ro.CoViz19.Api.Handlers
{
    public class FrontendDataQueryHandler : IRequestHandler<GetDailyStatsV2, DailyStatsV2Model>,
        IRequestHandler<GetLatestDataV2, HistoricalPdfStats>,
        IRequestHandler<GetAgeHistogramV2, AgeHistogramV2Model>,
        IRequestHandler<GetGenderStatsV2, GenderStatsV2Model>,
        IRequestHandler<GetQuickstatsV2Data, QuickStatsV2Model>,
        IRequestHandler<GetLastDataUpdateDetails, LastDataUpdateDetailsModel>,
        IRequestHandler<GetUiData, UiDataModel>,
        IRequestHandler<GetCountiesInfections, CountiesInfectionsModel>,
        IRequestHandler<GetAverageAge, AverageAgeModel>

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
            return HandleGetDailyStatsV2(currentData);
        }

        private DailyStatsV2Model HandleGetDailyStatsV2(HistoricalPdfStats currentData)
        {
            _logger.LogInformation($"Hanling {nameof(GetDailyStatsV2)}");
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
                    .OrderBy(x => x.ParsedOnString)
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

            var updateDetails = GetLastUpdatedDates(currentData, "dailyStats");

            response.DataLastUpdatedOn = updateDetails.lastUpdatedOn;
            response.DataLastUpdatedOnString = updateDetails.lastUpdatedOnString;
            response.Stale = updateDetails.stale;

            return response;
        }

        private static DailyStats GetDailyStatsDiff(DailyStats currentDay, DailyStats previousDay)
        {
            var day = new DailyStats
            {
                Cured = currentDay.Cured - previousDay.Cured,
                DatePublished = currentDay.DatePublished,
                DatePublishedString = currentDay.DatePublishedString,
                Deaths = currentDay.Deaths - previousDay.Deaths,
                Infected = currentDay.Infected - previousDay.Infected,
                Complete = currentDay.Complete
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
                AverageAge = currentData.AverageAge,
                Complete = currentData.Complete
            };
        }

        public async Task<HistoricalPdfStats> Handle(GetLatestDataV2 request, CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Hanling {nameof(GetLatestDataV2)}");

            return await _dataService.GetCurrentPdfData();
        }

        public async Task<AgeHistogramV2Model> Handle(GetAgeHistogramV2 request, CancellationToken cancellationToken)
        {
            var currentData = await _dataService.GetCurrentPdfData();

            return HandleGetAgeHistogramV2(currentData);
        }

        private AgeHistogramV2Model HandleGetAgeHistogramV2(HistoricalPdfStats data)
        {
            _logger.LogInformation($"Hanling {nameof(GetAgeHistogramV2)}");
            var updateDetails = GetLastUpdatedDates(data, "ageHistogram");

            var response = new AgeHistogramV2Model
            {
                Histogram = new Dictionary<AgeRange, int>()
            };

            if (data?.CurrentDayStats != null)
            {
                response.DatePublished = data.CurrentDayStats.ParsedOn;
                response.DatePublishedString = data.CurrentDayStats.ParsedOnString;
                response.Histogram = data.CurrentDayStats.DistributionByAge;
                response.Total = data.CurrentDayStats.DistributionByAge.Sum(x => x.Value);
            }

            response.DataLastUpdatedOn = updateDetails.lastUpdatedOn;
            response.DataLastUpdatedOnString = updateDetails.lastUpdatedOnString;
            response.Stale = updateDetails.stale;

            return response;
        }

        public async Task<GenderStatsV2Model> Handle(GetGenderStatsV2 request, CancellationToken cancellationToken)
        {
            var currentData = await _dataService.GetCurrentPdfData();

            return HandleGetGenderStatsV2(currentData);
        }

        private GenderStatsV2Model HandleGetGenderStatsV2(HistoricalPdfStats data)
        {
            _logger.LogInformation($"Hanling {nameof(GetGenderStatsV2)}");
            var updateDetails = GetLastUpdatedDates(data, "genderStats");

            var response = new GenderStatsV2Model();

            if (data?.CurrentDayStats != null)
            {
                response.DatePublished = data.CurrentDayStats.ParsedOn;
                response.DatePublishedString = data.CurrentDayStats.ParsedOnString;
                var percentageOfChildren = data.CurrentDayStats.PercentageOfChildren;
                var percentageOfMen = data.CurrentDayStats.PercentageOfMen;
                var percentageOfWomen = data.CurrentDayStats.PercentageOfWomen;

                response.PercentageOfChildren = percentageOfChildren;
                response.PercentageOfMen = percentageOfMen;
                response.PercentageOfWomen = percentageOfWomen;
                response.TotalPercentage = percentageOfChildren + percentageOfWomen + percentageOfMen;
                response.TotalNumber = data.CurrentDayStats.NumberInfected;
            }

            response.DataLastUpdatedOn = updateDetails.lastUpdatedOn;
            response.DataLastUpdatedOnString = updateDetails.lastUpdatedOnString;
            response.Stale = updateDetails.stale;

            return response;
        }

        public async Task<QuickStatsV2Model> Handle(GetQuickstatsV2Data request, CancellationToken cancellationToken)
        {
            var data = await _dataService.GetCurrentPdfData();

            return HandleGetQuickstatsV2Data(data);
        }

        private QuickStatsV2Model HandleGetQuickstatsV2Data(HistoricalPdfStats data)
        {
            _logger.LogInformation($"Hanling {nameof(GetQuickstatsV2Data)}");
            var updateDetails = GetLastUpdatedDates(data, "quickStats");

            var response = new QuickStatsV2Model()
            {
                History = new InfectionsStatsV2Model[0],
                Totals = new InfectionsStatsV2Model()
            };

            response.DataLastUpdatedOn = updateDetails.lastUpdatedOn;
            response.DataLastUpdatedOnString = updateDetails.lastUpdatedOnString;
            response.Stale = updateDetails.stale;

            if (data?.CurrentDayStats == null)
            {
                return response;
            }

            response.Totals = MapToInfectionsStatsV2Model(data.CurrentDayStats);

            var history = data.HistoricalData?
                .Select(x => x.Value)
                .Select(MapToInfectionsStatsV2Model)
                .ToList() ?? new List<InfectionsStatsV2Model>();

            history.Add(response.Totals);

            response.History = history.OrderBy(x => x.DateString).Skip(1).ToArray();

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

        public async Task<LastDataUpdateDetailsModel> Handle(GetLastDataUpdateDetails request,
            CancellationToken cancellationToken)
        {
            var data = await _dataService.GetCurrentPdfData();

            return HandleGetLastDataUpdateDetails(data);
        }

        private LastDataUpdateDetailsModel HandleGetLastDataUpdateDetails(HistoricalPdfStats data)
        {
            _logger.LogInformation($"Hanling {nameof(GetLastDataUpdateDetails)}");

            var result = new LastDataUpdateDetailsModel();
            var updateDetails = GetLastUpdatedDates(data, "");

            result.DataLastUpdatedOn = updateDetails.lastUpdatedOn;
            result.DataLastUpdatedOnString = updateDetails.lastUpdatedOnString;

            result.Charts = data?.Charts?
                                .Select(x => new { key = x.Key, value = MapToChartDataDetailsModel(x.Value) })
                                .ToDictionary(x => x.key, y => y.value) ?? new Dictionary<string, ChartDataDetailsModel>();

            return result;
        }

        private ChartDataDetailsModel MapToChartDataDetailsModel(ChartDataDetails details)
        {
            return new ChartDataDetailsModel
            {

                Contains = details?.Contains ?? new string[0],
                LastUpdatedOn = details?.LastUpdatedOn,
                Stale = details?.Stale ?? false
            };
        }

        public async Task<UiDataModel> Handle(GetUiData request, CancellationToken cancellationToken)
        {
            var data = await _dataService.GetCurrentPdfData();

            return new UiDataModel
            {
                AgeHistogram = HandleGetAgeHistogramV2(data),
                DailyStats = HandleGetDailyStatsV2(data),
                GenderStats = HandleGetGenderStatsV2(data),
                LastDataUpdateDetails = HandleGetLastDataUpdateDetails(data),
                QuickStats = HandleGetQuickstatsV2Data(data),
                Counties = HandleGetCountiesInfections(data),
                AverageAge = HandleGetAverageAge(data)
            };
        }

        private AverageAgeModel HandleGetAverageAge(HistoricalPdfStats data)
        {
            var updateDetails = GetLastUpdatedDates(data, "averageAge");
            return new AverageAgeModel()
            {
                LastUpdated = updateDetails.lastUpdatedOn,
                LastUpdatedString = updateDetails.lastUpdatedOnString,
                Stale = updateDetails.stale,
                Value = data?.CurrentDayStats?.AverageAge
            };
        }

        private (string lastUpdatedOnString, long lastUpdatedOn, bool stale) GetLastUpdatedDates(HistoricalPdfStats data, string chartKey)
        {
            if (data?.Charts?.ContainsKey(chartKey) ?? false)
            {
                var chartDataDetails = data.Charts[chartKey];

                var lastUpdatedOnString = string.IsNullOrEmpty(chartDataDetails.LastUpdatedOn) ? data.LasUpdatedOnString : chartDataDetails.LastUpdatedOn;
                return (lastUpdatedOnString, -1, chartDataDetails.Stale);
            }


            return (data?.LasUpdatedOnString, -1, false);
        }

        private CountiesInfectionsModel HandleGetCountiesInfections(HistoricalPdfStats data)
        {
            var updateDetails = GetLastUpdatedDates(data, "counties");

            return new CountiesInfectionsModel
            {
                Data = data?.CurrentDayStats?.CountyInfectionsNumbers?.Select(x => MapToCountyInfectionModel(x.Key, x.Value)).ToArray() ?? new CountyInfectionModel[0],
                LastUpdated = updateDetails.lastUpdatedOn,
                LastUpdatedString = updateDetails.lastUpdatedOnString,
                Stale = updateDetails.stale
            };
        }

        private static CountyInfectionModel MapToCountyInfectionModel(County county, int number)
        {
            var countyPopulation = Data.CountyPopulation[county];
            decimal population = (decimal)countyPopulation;
            return new CountyInfectionModel
            {
                County = county,
                NumberInfected = number,
                TotalPopulation = countyPopulation,
                InfectionPercentage = ((decimal)number / population) * 100,
                InfectionsPerThousand = ((decimal)number / ToThousandQuotient(population))
            };
        }

        private static decimal ToThousandQuotient(decimal value)
        {
            return value / 1000m;
        }

        public async Task<CountiesInfectionsModel> Handle(GetCountiesInfections request, CancellationToken cancellationToken)
        {
            var data = await _dataService.GetCurrentPdfData();

            return HandleGetCountiesInfections(data);
        }

        public async Task<AverageAgeModel> Handle(GetAverageAge request, CancellationToken cancellationToken)
        {
            var data = await _dataService.GetCurrentPdfData();

            return HandleGetAverageAge(data);
        }
    }
}
