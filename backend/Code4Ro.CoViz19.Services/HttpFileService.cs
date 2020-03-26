using System;
using System.Net.Http;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Services.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Code4Ro.CoViz19.Services
{
    public class HttpFileService : IFileService
    {
        private readonly ILogger<HttpFileService> _logger;
        private readonly HttpFileServiceOptions _options;
        public HttpFileService(IOptions<HttpFileServiceOptions> options, ILogger<HttpFileService> logger)
        {
            _logger = logger;
            _options = options.Value;
        }

        public async Task<string> GetRawData()
        {
            try
            {
                var result = await new HttpClient().GetAsync(_options.JsonFileUrl);
                _logger.LogDebug(
                    $"GET {_options.JsonFileUrl ?? string.Empty} returned {(result?.StatusCode)?.ToString() ?? "N/A"}");
                if (result == null || !result.IsSuccessStatusCode || result.Content == null)
                    return string.Empty;

                return await result.Content.ReadAsStringAsync();
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return string.Empty;
            }
        }

#pragma warning disable 1998
        public async Task SaveRawData(string fileContent) => throw new NotImplementedException();
#pragma warning restore 1998
    }
}
