using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Services
{
    public class NoCacheService : ICacheService
    {
        public async Task<T> GetOrSaveDataInCacheAsync<T>(string name, Func<Task<T>> source,
            MemoryCacheEntryOptions options = null)
        {
            return await source();
        }

        public Task<T> GetObjectSafeAsync<T>(string name) => Task.FromResult(default(T));

        public Task SaveObjectSafeAsync(string name, object value,
            MemoryCacheEntryOptions options = null) => Task.FromResult(false);
    }

    public class MemoryCacheService : ICacheService
    {
        private readonly IMemoryCache _cache;
        private readonly ILogger<MemoryCacheService> _logger;

        public MemoryCacheService(IMemoryCache cache, ILogger<MemoryCacheService> logger)
        {
            _cache = cache;
            _logger = logger;
        }

        public async Task<T> GetOrSaveDataInCacheAsync<T>(string name, Func<Task<T>> source,
            MemoryCacheEntryOptions options = null)
        {
            var obj = await GetObjectSafeAsync<T>(name);

            if (obj != null)
            {
                return obj;
            }

            var result = await source();

            await SaveObjectSafeAsync(name, result, options);

            return result;
        }

        public async Task<T> GetObjectSafeAsync<T>(string name)
        {
            var result = default(T);
            await Task.FromResult(true);
            try
            {
                var cache = _cache.Get<string>(name);

                if (cache == null)
                {
                    _logger.LogInformation($"Cache missed for {name}");
                    return result;
                }

                var obj = JsonConvert.DeserializeObject<T>(cache);

                return obj;

            }
            catch (Exception exception)
            {
                _logger.LogError(GetHashCode(), exception, exception.Message);
            }

            return result;
        }

        public async Task SaveObjectSafeAsync(string name, object value, MemoryCacheEntryOptions options = null)
        {
            try
            {
                await Task.FromResult(true);

                var obj = JsonConvert.SerializeObject(value);

                if (options != null)
                {
                    _cache.Set(name, obj, options);
                }
                else
                {
                    _cache.Set(name, obj);
                }
            }
            catch (Exception exception)
            {
                _logger.LogError(GetHashCode(), exception, exception.Message);
            }
        }

    }
}