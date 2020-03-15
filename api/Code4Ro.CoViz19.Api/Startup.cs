using Code4Ro.CoViz19.Api.Middleware;
using Code4Ro.CoViz19.Api.Models;
using Code4Ro.CoViz19.Api.Options;
using Code4Ro.CoViz19.Api.Services;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System.Net;
using System.Reflection;
using System.Text;

namespace Code4Ro.CoViz19.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            services.Configure<CacheOptions>(Configuration.GetSection("Cache"));

            services.AddSingleton<IDataProviderService, DummyDataProviderService>();
            services.AddSingleton<ICacheSercice, NoCacheService>();

            services.AddControllers();
            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddCors(options => options.AddPolicy("Permissive", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Code4Ro.CoViz19.Api", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpStatusCodeExceptionMiddleware();

            //app.UseExceptionHandler(builder =>
            //    builder.Run(async context =>
            //    {
            //        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            //        var ex = context.Features.Get<IExceptionHandlerFeature>();
            //        if (ex != null)
            //        {
            //            StringBuilder message = new StringBuilder();
            //            var messageModel = new ErrorModel
            //            {
            //                Message = ex.Error.Message,
            //            };

            //            if (env.IsDevelopment())
            //            {
            //                messageModel.Detail = ex.Error.StackTrace;
            //            }
            //            else
            //            {
            //                message.AppendLine("An error has occurred");
            //            }

            //            await context.Response.WriteAsync(JsonConvert.SerializeObject(messageModel));

            //        }
            //    }));


            app.UseHttpsRedirection();
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tjip.Mas.DataService.Api V1");
                c.RoutePrefix = string.Empty;
            });
            app.UseCors("Permissive");
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
