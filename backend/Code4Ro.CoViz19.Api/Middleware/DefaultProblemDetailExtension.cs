using System;
using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Code4Ro.CoViz19.Api.Middleware
{
    public static class DefaultProblemDetailExtension
    {
        public static IServiceCollection AddDefaultProblemDetails(this IServiceCollection services)
        {
            services.AddProblemDetails(options =>
            {
                options.IncludeExceptionDetails = ctx => true;

                //options.Map<RecordNotFoundException>((context, ex) => new ProblemDetails
                //{
                //    Title = "No appropriate data found to process the request.",
                //    Status = StatusCodes.Status422UnprocessableEntity,
                //    Type = "https://httpstatuses.com/422",
                //    Instance = context.Request.Path,
                //    Detail = ex?.Message,
                //});

                options.Map<NotImplementedException>(ex => new ExceptionProblemDetails(ex, StatusCodes.Status501NotImplemented));

                // Because exceptions are handled polymorphically, this will act as a "catch all" mapping,
                // which is why it's added last. If an exception other than NotImplementedException and
                // HttpRequestException is thrown, this will handle it.
                options.Map<Exception>(ex => new ExceptionProblemDetails(ex, StatusCodes.Status500InternalServerError));
            });
            return services;
        }

        public static IApplicationBuilder UseDefaultProblemDetails(this IApplicationBuilder app)
        {
            app.UseProblemDetails();
            return app;
        }
    }
}