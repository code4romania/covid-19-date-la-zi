using System;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Api.Services
{
    public interface ICacheSercice
    {
        Task<T> GetOrCreate<T>(string cacheKey, Func<T> dataLoaderFunc);

        Task Cache<T>(string cacheKey, T value);
        Task Cache<T>(string cacheKey, T value, long secondsTimespan);
    }
}