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

namespace Code4Ro.CoViz19.Api.Handlers
{
    public class DataQueryHandler : IRequestHandler<GetLatestData, ParsedDataModel>,
        IRequestHandler<GetQuickstatsData, QuickStatsModel>
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
                Totals = ParsedDataToApiModelsMapper.MapToInfectionsStatsModel(latestStats),
                History = data?.LiveUpdateData.OrderBy(x=>x.Timestamp).Select(x=> ParsedDataToApiModelsMapper.MapToInfectionsStatsModel(x)).ToArray()
            };
        }

        private static LiveUpdateData GetLatestStatsFromLivedata(ParsedDataModel data)
        {
            return data.LiveUpdateData.OrderByDescending(x => x.Timestamp).FirstOrDefault();
        }
    }
}
