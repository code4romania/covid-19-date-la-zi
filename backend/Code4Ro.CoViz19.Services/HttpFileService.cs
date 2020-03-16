using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Services
{
    public class HttpFileService : IFileService
    {
        private readonly string _url = "https://stdatelazi.blob.core.windows.net/date/latestData.json";
        public string GetRawData() => new HttpClient().GetAsync(_url).Result.Content.ReadAsStringAsync().Result;

        public async Task SaveRawData(string fileContent) => throw new NotImplementedException();
    }
}
