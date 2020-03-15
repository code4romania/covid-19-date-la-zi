using Code4Ro.CoViz19.Api.Commands;
using Code4Ro.CoViz19.Api.Services;
using Code4Ro.CoViz19.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Api.Handlers
{
    public class DataHandler : IRequestHandler<GetLatestData, ParsedDataModel>
    {
        private readonly IDataProviderService _dataService;
        private readonly ICacheSercice _cacheService;
        private readonly ILogger<DataHandler> _logger;

        public DataHandler(IDataProviderService dataService, ICacheSercice cacheService,ILogger<DataHandler> logger)
        {
            _dataService = dataService;
            _cacheService = cacheService;
            _logger = logger;
        }
        public async Task<ParsedDataModel> Handle(GetLatestData request, CancellationToken cancellationToken)
        {
           return await _dataService.GetCurrentData();
        }
    }
}
