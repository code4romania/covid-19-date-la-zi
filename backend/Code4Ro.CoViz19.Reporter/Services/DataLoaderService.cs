using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Reporter.Extensions;
using Code4Ro.CoViz19.Reporter.Options;
using Code4Ro.CoViz19.Services;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Reporter.Services
{
    public class DataLoaderService : CronJobService
    {
        private const string CurrentDataHashKey = "current-data-hash";
        private readonly IFileService _fileService;
        private readonly ILogger<DataLoaderService> _logger;
        private readonly PeanutOptions _peanutOptions;
        private readonly HttpClient _peanutHttpClient;
        private readonly IMemoryCache _cache;

        public DataLoaderService(IScheduleConfig<DataLoaderService> config, IFileService fileService, IMemoryCache cache, IOptions<PeanutOptions> peanutOptions, ILogger<DataLoaderService> logger)
            : base(config.CronExpression, config.TimeZoneInfo)
        {
            _fileService = fileService;
            _logger = logger;
            _cache = cache;
            _peanutOptions = peanutOptions?.Value ?? throw new ArgumentNullException(nameof(peanutOptions));

            _peanutHttpClient = new HttpClient();
            _peanutHttpClient.DefaultRequestHeaders.Add(_peanutOptions.AuthHeader, _peanutOptions.AuthKey);
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"{nameof(DataLoaderService)} starts.");
            return base.StartAsync(cancellationToken);
        }

        public override async Task DoWork(CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"{DateTime.Now:hh:mm:ss} {nameof(DataLoaderService)} is working.");

                var historicalPdfStats = await _fileService.GetRawData();
                var currentHash = ComputeSha256Hash(historicalPdfStats);
                var previousHash = _cache.Get<string>(CurrentDataHashKey);
                if (currentHash != previousHash)
                {
                    _cache.Set(CurrentDataHashKey, currentHash);

                    if (_peanutOptions.FeatureEnabled)
                    {
                        var response = await _peanutHttpClient.PostAsync(_peanutOptions.Url, new StringContent(@"{
	                        ""outputs"":{
                                ""3196x288"":""https://date-la-zi.ro/banners/ultraWide"",
                                ""1280x720"":""https://date-la-zi.ro/banners/landscape"",
                                ""1024x635"":""https://date-la-zi.ro/banners/landscape"",
                                ""1080x1920"":""https://date-la-zi.ro/banners/portrait""
                            }
                        }", Encoding.UTF8, "application/json"), cancellationToken);

                        if (response.IsSuccessStatusCode)
                        {
                            var responseString = await response.Content.ReadAsStringAsync();

                            FileLoggerService.WriteLog(responseString);
                        }
                        else
                        {
                            _logger.LogInformation($"Received unsuccessful response {response.StatusCode}");
                        }
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Trouble with handling new data");
            }
        }

        public override Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"{nameof(DataLoaderService)} is stopping.");
            return base.StopAsync(cancellationToken);
        }

        static string ComputeSha256Hash<T>(T data)
        {
            var stringify = JsonConvert.SerializeObject(data);
            // Create a SHA256   
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(stringify));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
