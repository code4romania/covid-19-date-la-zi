using Code4Ro.CoViz19.Api.Commands;
using Code4Ro.CoViz19.Api.Models;
using Code4Ro.CoViz19.Api.Services;
using Code4Ro.CoViz19.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Code4Ro.CoViz19.Api.Mappers;
using System.Collections.Generic;
using System;

namespace Code4Ro.CoViz19.Api.Handlers
{
    public class DataQueryHandler : IRequestHandler<GetLatestData, ParsedDataModel>,
        IRequestHandler<GetQuickstatsData, QuickStatsModel>,
        IRequestHandler<GetDailyStats, DailyStatsModel>,
        IRequestHandler<GetGenderStats, GenderStatsModel>,
        IRequestHandler<GetGenderAgeHistogram, GenderAgeHistogramModel>,
        IRequestHandler<GetCountyInfections, CountyInfectionsModel>,
        IRequestHandler<GetInfectionsSource, InfectionsSourceStatisticsModel>
    {
        private readonly IDataProviderService _dataService;
        private readonly ICacheSercice _cacheService;
        private readonly ILogger<DataQueryHandler> _logger;

        public DataQueryHandler(IDataProviderService dataService, ICacheSercice cacheService, ILogger<DataQueryHandler> logger)
        {
            _dataService = dataService;
            _cacheService = cacheService;
            _logger = logger;
        }
        public async Task<ParsedDataModel> Handle(GetLatestData request, CancellationToken cancellationToken)
        {
            return await _dataService.GetCurrentData();
        }

        public async Task<QuickStatsModel> Handle(GetQuickstatsData request, CancellationToken cancellationToken)
        {
            var data = await _dataService.GetCurrentData();

            var latestStats = GetLatestStatsFromLivedata(data);

            return new QuickStatsModel
            {
                Totals = ParsedDataToApiModelsMapper.MapToInfectionsStatsModel(latestStats, data),
                History = data?.LiveUpdateData.OrderBy(x => x.Timestamp).Select(x => ParsedDataToApiModelsMapper.MapToInfectionsStatsModel(x, data)).ToArray()
            };
        }

        private static LiveUpdateData GetLatestStatsFromLivedata(ParsedDataModel data)
        {
            return data.LiveUpdateData.OrderByDescending(x => x.Timestamp).FirstOrDefault();
        }

        public async Task<DailyStatsModel> Handle(GetDailyStats request, CancellationToken cancellationToken)
        {
            var data = await _dataService.GetCurrentData();

            if (data?.LiveUpdateData == null)
            {
                return new DailyStatsModel() { History = new InfectionsStatsModel[0] };
            }

            if (data.LiveUpdateData.Length == 1)
            {
                return new DailyStatsModel() { History = new InfectionsStatsModel[] { ParsedDataToApiModelsMapper.MapToInfectionsStatsModel(data.LiveUpdateData.First(), data) } };
            }

            List<InfectionsStatsModel> history = new List<InfectionsStatsModel>();
            List<LiveUpdateData> oderedLiveData = data.LiveUpdateData.OrderBy(x => x.Timestamp).ToList();
            LiveUpdateData previousDayData = null;

            foreach (var dayData in oderedLiveData)
            {
                var dayStats = GetDayDataDiff(previousDayData, dayData);
                history.Add(dayStats);
                previousDayData = dayData;
            }

            return new DailyStatsModel()
            {
                History = history.ToArray()
            };
        }

        private InfectionsStatsModel GetDayDataDiff(LiveUpdateData previousDayData, LiveUpdateData dayData)
        {
            return new InfectionsStatsModel
            {
                Confirmed = GetIntOrDefault(dayData?.NumberDiagnosed) - GetIntOrDefault(previousDayData?.NumberDiagnosed),
                Hospitalized = GetIntOrDefault(0) - GetIntOrDefault(0), // TODO: update when we have data for hospitalized
                Monitored = GetIntOrDefault(dayData?.NumberMonitoredAtHome) - GetIntOrDefault(previousDayData?.NumberMonitoredAtHome),
                Date = new DateTimeOffset(dayData.Timestamp).ToUnixTimeSeconds(),
                DateString = dayData.Timestamp.ToShortDateString(),
                Cured = GetIntOrDefault(dayData?.NumberCured) - GetIntOrDefault(previousDayData?.NumberCured),
                InQuarantine = GetIntOrDefault(dayData?.NumberQuarantined) - GetIntOrDefault(previousDayData?.NumberQuarantined),
                InIcu = GetIntOrDefault(0) - GetIntOrDefault(0), // TODO: update when we have data for InIcu
            };
        }

        private static int GetIntOrDefault(int? value)
        {
            return value ?? 0;
        }

        public async Task<GenderStatsModel> Handle(GetGenderStats request, CancellationToken cancellationToken)
        {
            var currentData = await _dataService.GetCurrentData();
            long today = new DateTimeOffset(DateTime.Today).ToUnixTimeSeconds();
            string todayString = DateTime.Today.ToShortDateString();

            var response = new GenderStatsModel
            {
                Stats = new Stats()
                {
                    Men = 0,
                    Women = 0,
                    Date = today,
                    DateString = todayString,
                    Total = 0
                }
            };

            if (currentData?.PatientsInfo == null)
            {
                return response;
            }

            response.Stats.Men = currentData.PatientsInfo.Count(x => x.Gender == Gender.Man);
            response.Stats.Women = currentData.PatientsInfo.Count(x => x.Gender == Gender.Woman);
            response.Stats.Total = currentData.PatientsInfo.Count();

            return response;
        }

        public async Task<GenderAgeHistogramModel> Handle(GetGenderAgeHistogram request, CancellationToken cancellationToken)
        {
            var currentData = await _dataService.GetCurrentData();
            if (currentData?.PatientsInfo == null)
            {
                return new GenderAgeHistogramModel()
                {
                    Histogram = new Dictionary<HistogramRangeEnum, HistogramModel>(),
                    Total = 0
                };
            }
            var histogram = currentData.PatientsInfo
                .Where(x => x.Age.HasValue)
                 .Select(x => new { ageRange = ToAgeRange(x.Age ?? 0), gender = x.Gender })
                 .GroupBy(x => x.ageRange, y => y.gender, (key, genderlist) => new
                 {
                     key = key,
                     model = new HistogramModel()
                     {
                         Men = genderlist.Count(x => x == Gender.Man),
                         Women = genderlist.Count(x => x == Gender.Woman)
                     }
                 })
                 .ToDictionary(x => x.key, y => y.model);

            return new GenderAgeHistogramModel()
            {
                Histogram = histogram,
                Total = currentData.PatientsInfo.Count()
            };
        }

        public async Task<CountyInfectionsModel> Handle(GetCountyInfections request, CancellationToken cancellationToken)
        {
            var currentData = await _dataService.GetCurrentData();

            var response = new CountyInfectionsModel()
            {
                Date = new DateTimeOffset(DateTime.Today).ToUnixTimeSeconds(),
                DateString = DateTime.Today.ToShortDateString(),
                Counties = new CountyDataModel[0]
            };

            if (currentData?.CountiesData == null || currentData?.CountiesData.Length == 0)
            {
                return response;
            }

            response.Total = currentData.CountiesData.Sum(m => m.NumberOfInfections ?? 0);
            response.Counties = currentData.CountiesData.Select(m => new CountyDataModel
            {
                Name = CountiesNameMapper.MapToRomanianName(m.County),
                Count = m.NumberOfInfections ?? 0
            }).ToArray();

            return response;
        }

        public async Task<InfectionsSourceStatisticsModel> Handle(GetInfectionsSource request, CancellationToken cancellationToken)
        {
            var data = await _dataService.GetCurrentData();
            var response = new InfectionsSourceStatisticsModel()
            {
                Totals = new InfectionsSourceTotals()
                {
                    Date = new DateTimeOffset(DateTime.Today).ToUnixTimeSeconds(),
                    DateString = DateTime.Today.ToShortDateString(),
                    Extern = 0,
                    Intern = 0
                }
            };

            if (data?.PatientsInfo == null || data?.PatientsInfo.Length == 0)
            {
                return response;
            }

            response.Totals.Extern = data.PatientsInfo.Count(x => x.InfectionSourceType == InfectionSourceType.Extern);
            response.Totals.Intern = data.PatientsInfo.Count(x => x.InfectionSourceType == InfectionSourceType.Intern);
            response.Totals.Total = data.PatientsInfo.Count();

            return response;
        }

        private HistogramRangeEnum ToAgeRange(int age)
        {
            if (age <= 10) return HistogramRangeEnum.Age010;
            if (age <= 20) return HistogramRangeEnum.Age1120;
            if (age <= 30) return HistogramRangeEnum.Age2130;
            if (age <= 40) return HistogramRangeEnum.Age3140;
            if (age <= 50) return HistogramRangeEnum.Age4150;
            if (age <= 60) return HistogramRangeEnum.Age5160;
            if (age <= 70) return HistogramRangeEnum.Age6170;
            if (age <= 80) return HistogramRangeEnum.Age7180;
            if (age <= 90) return HistogramRangeEnum.Age8190;

            return HistogramRangeEnum.Age91100;
        }


    }
}
