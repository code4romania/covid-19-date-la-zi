using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;

namespace Code4Ro.CoViz19.Api.Services
{
    public interface ICacheService
    {
        Task<T> GetOrSaveDataInCacheAsync<T>(string name, Func<Task<T>> source, MemoryCacheEntryOptions options = null);
        Task<T> GetObjectSafeAsync<T>(string name);
        Task SaveObjectSafeAsync(string name, object value, MemoryCacheEntryOptions options = null);
    }
}