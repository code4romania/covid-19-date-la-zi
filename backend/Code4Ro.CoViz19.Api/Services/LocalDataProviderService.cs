using System.Threading.Tasks;
using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Services;
using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Services
{
    public class LocalDataProviderService : IDataProviderService
    {
        private readonly IFileService _fileService;
        private ParsedDataModel _localData;

        public LocalDataProviderService(IFileService fileService)
        {
            _fileService = fileService;
        }


        public async Task<ParsedDataModel> GetCurrentData() =>
            _localData = JsonConvert.DeserializeObject<ParsedDataModel>(_fileService.GetRawData());
    }

}
