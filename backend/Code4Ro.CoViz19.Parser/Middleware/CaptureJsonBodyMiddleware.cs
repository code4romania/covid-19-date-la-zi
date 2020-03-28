using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Code4Ro.CoViz19.Parser.Middleware
{
    public class CaptureJsonBodyMiddleware
    {
        private readonly RequestDelegate _next;

        public CaptureJsonBodyMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            context.Request.EnableBuffering();

            using (var reader = new StreamReader(context.Request.Body, leaveOpen: true))
            {
                var body = await reader.ReadToEndAsync();

                // Reset the request body stream position so the next middleware can read it
                context.Request.Body.Position = 0;
                context.Items["JsonBody"] = body;
            }

            // Call the next delegate/middleware in the pipeline
            await _next(context);
        }
    }
}