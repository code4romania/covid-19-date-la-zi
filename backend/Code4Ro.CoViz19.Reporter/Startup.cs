using System;
using Code4Ro.CoViz19.Reporter.Extensions;
using Code4Ro.CoViz19.Reporter.Options;
using Code4Ro.CoViz19.Reporter.Services;
using Code4Ro.CoViz19.Services;
using Code4Ro.CoViz19.Services.Options;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Code4Ro.CoViz19.Reporter
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
            services.AddHealthChecks();
            services.Configure<PeanutOptions>(Configuration.GetSection("PeanutOptions"));
            services.Configure<HttpFileServiceOptions>(Configuration.GetSection("HttpFileServiceOptions"));
            services.AddSingleton<IFileService, HttpFileService>();
            services.AddMemoryCache();
            services.AddCors(options => options.AddPolicy("Permissive", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            services.AddCronJob<DataLoaderService>(c =>
            {
                c.TimeZoneInfo = TimeZoneInfo.Local;
                c.CronExpression = Configuration.GetValue<string>("Reporter:CronExpression");
            });
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseHealthChecks("/health");
            app.UseCors("Permissive");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}
