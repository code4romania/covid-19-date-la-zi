using System;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Api.Services
{
    public class NoCacheService : ICacheSercice
    {
        public async Task Cache<T>(string cacheKey, T value)
        {
            await Task.FromResult(true);
        }

        public async Task Cache<T>(string cacheKey, T value, long secondsTimespan)
        {
            await Task.FromResult(true);
        }

        public async Task<T> GetOrCreate<T>(string cacheKey, Func<T> dataLoaderFunc)
        {
            await Task.FromResult(true);

            return dataLoaderFunc();

        }
    }
}