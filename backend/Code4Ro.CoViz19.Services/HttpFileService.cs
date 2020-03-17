using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace Code4Ro.CoViz19.Services
{
    public class HttpFileService : IFileService
    {
        private readonly string _url = "https://stdatelazi.blob.core.windows.net/date/latestData.json";
        private readonly HttpFileServiceOptions _options;
        public HttpFileService(IOptions<HttpFileServiceOptions> options)
        {
            _options = options.Value;
        }
        public string GetRawData() => new HttpClient().GetAsync(_options.JsonFileUrl).Result.Content.ReadAsStringAsync().Result;

        public async Task SaveRawData(string fileContent) => throw new NotImplementedException();
    }
}
