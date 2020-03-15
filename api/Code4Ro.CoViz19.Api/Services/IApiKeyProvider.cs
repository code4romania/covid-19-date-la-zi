using Code4Ro.CoViz19.Api.Options;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Code4Ro.CoViz19.Api.Services
{
    public interface IApiKeyProvider
    {
        bool IsValidApiKey(string potentialApiKey);
    }

    public class InMemoryGetApiKeyQuery : IApiKeyProvider
    {
        private readonly IDictionary<string, ApiKey> _apiKeys;

        public InMemoryGetApiKeyQuery(IOptions<AuthorizationOptions> authorizationOptions)
        {
            var existingApiKeys = authorizationOptions?.Value?.ApiKeys ?? throw new ArgumentNullException(nameof(authorizationOptions));

            _apiKeys = existingApiKeys.ToDictionary(x => x.Key, x => x);
        }

        public bool IsValidApiKey(string providedApiKey)
        {
            _apiKeys.TryGetValue(providedApiKey, out var key);
            return key != null;
        }
    }
}
