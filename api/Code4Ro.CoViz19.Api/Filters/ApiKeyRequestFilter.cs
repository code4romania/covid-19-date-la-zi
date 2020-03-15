using Code4Ro.CoViz19.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Api.Filters
{
    public class ApiKeyRequestFilterAttribute : IAsyncActionFilter
    {
        public const string HeaderName = "api-key";
        private readonly IApiKeyProvider _apiKeyProvider;

        public ApiKeyRequestFilterAttribute(IApiKeyProvider apiKeyProvider)
        {
            _apiKeyProvider = apiKeyProvider;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.HttpContext.Request.Headers.TryGetValue(HeaderName, out var potentialApiKey))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            if (!_apiKeyProvider.IsValidApiKey(potentialApiKey))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            await next();
        }
    }

    public class ApiKeyRequestFilterFactory : Attribute, IFilterFactory
    {
        public bool IsReusable => false;

        public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
        {
            var filter = (ApiKeyRequestFilterAttribute)serviceProvider.GetService(typeof(ApiKeyRequestFilterAttribute));
            return filter;
        }
    }


}
