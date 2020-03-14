using Code4Ro.CoViz19.Api.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Api.Middleware
{
    public class ExceptionHandlerMiddleware
    {
        private readonly ILogger<ExceptionHandlerMiddleware> _logger;
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(
            ILoggerFactory loggerFactory,
            RequestDelegate next)
        {
            var logger = loggerFactory?.CreateLogger<ExceptionHandlerMiddleware>();

            _logger = logger;
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex, "Something went wrong please try again.");
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, string message)
        {
            _logger.LogError(ex, ex.Message);

            if (context.Response.HasStarted)
            {
                _logger.LogWarning("The response has already started, the http status code middleware will not be executed.");
                throw ex;
            }

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = MediaTypeNames.Application.Json;
            var messageModel = new ErrorModel
            {
                Message = message,
            };

#if DEBUG
            messageModel.Detail = ex.Message + Environment.NewLine + ex.StackTrace;
#endif
            await context.Response.WriteAsync(JsonConvert.SerializeObject(messageModel));
        }
    }


    public static class ExceptionHandlerMiddlewareExtensions
    {
        public static IApplicationBuilder UseHttpStatusCodeExceptionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionHandlerMiddleware>();
        }
    }
}
