using System;
using System.Net.Http;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Services.Options;
using Microsoft.Extensions.Options;

namespace Code4Ro.CoViz19.Services
{
    public class HttpFileService : IFileService
    {
        private readonly HttpFileServiceOptions _options;
        public HttpFileService(IOptions<HttpFileServiceOptions> options)
        {
            _options = options.Value;
        }
        public string GetRawData() => new HttpClient().GetAsync(_options.JsonFileUrl).Result.Content.ReadAsStringAsync().Result;

#pragma warning disable 1998
        public async Task SaveRawData(string fileContent) => throw new NotImplementedException();
#pragma warning restore 1998
    }
}
