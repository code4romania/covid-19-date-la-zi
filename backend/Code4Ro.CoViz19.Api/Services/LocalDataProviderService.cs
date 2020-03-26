using System.Threading.Tasks;
using Amazon.Runtime.Internal.Util;
using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Models.ParsedPdfModels;
using Code4Ro.CoViz19.Services;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Services
{
    public class LocalDataProviderService : IDataProviderService
    {
        private readonly IFileService _fileService;
        private readonly ILogger<LocalDataProviderService> _logger;
        private ParsedDataModel _localData;

        public LocalDataProviderService(IFileService fileService, ILogger<LocalDataProviderService> logger)
        {
            _fileService = fileService;
            _logger = logger;
        }


        public async Task<ParsedDataModel> GetCurrentData() =>
            _localData = JsonConvert.DeserializeObject<ParsedDataModel>(_fileService.GetRawData());

        public async Task<HistoricalPdfStats> GetCurrentPdfData()
        {
            _logger.LogDebug($"starting to read from _fileService of type {_fileService.GetType()}");
            await Task.FromResult(0);
            var result = JsonConvert.DeserializeObject<HistoricalPdfStats>(_fileService.GetRawData());
            _logger.LogDebug($"done reading from _fileService");
            return result;
        }
    }

}
