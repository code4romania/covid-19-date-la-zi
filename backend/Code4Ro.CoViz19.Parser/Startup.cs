using System.Reflection;
using System.Text;
using Amazon.S3;
using Code4Ro.CoViz19.Parser.Middleware;
using Code4Ro.CoViz19.Services;
using Code4Ro.CoViz19.Services.Options;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace Code4Ro.CoViz19.Parser
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
            services.AddHealthChecks();
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddControllersWithViews().AddNewtonsoftJson();
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            services.Configure<FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = long.MaxValue;
            });
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddAWSService<IAmazonS3>();
            switch (Configuration.GetValue<StorageTypes>("StorageType"))
            {
                case StorageTypes.FileSystem:
                    services.AddSingleton<IFileService, LocalFileService>();
                    break;
                case StorageTypes.AzureBlob:
                    services.AddSingleton<IFileService, BlobService>();
                    break;
                case StorageTypes.Aws:
                    services.AddSingleton<IFileService, S3FileService>();
                    break;
            }

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Code4Ro.CoViz19.Parser", Version = "v1" });
                c.EnableAnnotations();
            });
            services.Configure<S3StorageOptions>(Configuration.GetSection("AWS"));
            services.Configure<BlobStorageOptions>(Configuration.GetSection(nameof(BlobStorageOptions)));

            services
                .AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.Converters.Add(new StringEnumConverter());
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHealthChecks("/health");


            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Code4Ro.CoViz19.Parser V1");
                c.DisplayRequestDuration();
            });
            app.UseRouting();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMiddleware<CaptureJsonBodyMiddleware>();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });


        }
    }
}
