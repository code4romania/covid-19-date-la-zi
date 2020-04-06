using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Api.Extensions;
using Code4Ro.CoViz19.Api.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Services
{
    public class DataLoaderService : CronJobService
    {
        private readonly ILogger<DataLoaderService> _logger;
        private readonly ICacheService _cache;
        private readonly IDataProviderService _dataProvider;
        private readonly PeanutOptions _peanutOptions;
        private readonly HttpClient _peanutHttpClient;

        public DataLoaderService(IScheduleConfig<DataLoaderService> config, ILogger<DataLoaderService> logger, ICacheService cache, IDataProviderService dataProvider, IOptions<PeanutOptions> peanutOptions)
            : base(config.CronExpression, config.TimeZoneInfo)
        {
            _logger = logger;
            _cache = cache;
            _dataProvider = dataProvider;
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

                var historicalPdfStats = await _dataProvider.GetCurrentPdfData();
                var currentHash = ComputeSha256Hash(historicalPdfStats);
                var previousHash = await _cache.GetObjectSafeAsync<string>("current-data-hash");

                if (currentHash != previousHash)
                {
                    await _cache.SaveObjectSafeAsync("current-data-hash", currentHash);
                    await _cache.SaveObjectSafeAsync("current-data", historicalPdfStats);

                    if (_peanutOptions.FeatureEnabled)
                    {
                        // todo: change to correct content
                        await _peanutHttpClient.PostAsync(_peanutOptions.Url, new StringContent(@"{
	                        ""outputs"":{
		                        ""384x288"":""https://responsivedesign.is/examples"",
		                        ""2400x360"":""https://responsivedesign.is/examples"",
		                        ""1920x1080"":""https://responsivedesign.is/examples"",
		                        ""1280x720"":""https://responsivedesign.is/examples"",
		                        ""1080x1920"":""https://responsivedesign.is/examples""
	                        }
                        }", Encoding.UTF8, "application/json"), cancellationToken);
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
