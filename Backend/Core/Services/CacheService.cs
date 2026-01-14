using Core.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace Core.Services
{
    public class CacheService : ICacheService
    {
        private readonly IMemoryCache cache;

        public CacheService(IMemoryCache cache)
        {
            this.cache = cache;
        }

        public async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> factory, TimeSpan ttl)
        {
            if (cache.TryGetValue(key, out T value))
                return value!;

            value = await factory();
            cache.Set(key, value, ttl);
            return value;
        }

        public void Remove(string key)
        {
            cache.Remove(key);
        }
    }
}
