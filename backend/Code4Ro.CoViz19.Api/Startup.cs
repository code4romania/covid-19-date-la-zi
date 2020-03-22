using Code4Ro.CoViz19.Api.Filters;
using Code4Ro.CoViz19.Api.Middleware;
using Code4Ro.CoViz19.Api.Options;
using Code4Ro.CoViz19.Api.Services;
using Code4Ro.CoViz19.Services;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using Code4Ro.CoViz19.Services.Options;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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
            services.AddHealthChecks();
            services.Configure<CacheOptions>(Configuration.GetSection("Cache"));
            services.Configure<AuthorizationOptions>(Configuration.GetSection("Authorization"));
            services.Configure<HttpFileServiceOptions>(Configuration.GetSection("HttpFileServiceOptions"));

            services.AddSingleton<IDataProviderService, LocalDataProviderService>();
            // used to get the JSON parsed excel file. It can be either LocalFileService (from ./latestData.json) or HttpFileService (from https://stdatelazi.blob.core.windows.net/date/latestData.json)
            services.AddSingleton<IFileService, HttpFileService>();
            services.AddSingleton<ICacheSercice, NoCacheService>();
            services.AddSingleton<IApiKeyValidator, InMemoryApiKeyValidator>();
            services.AddTransient<ApiKeyRequestFilterAttribute>();
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
                c.EnableAnnotations();
                c.ExampleFilters();
                c.AddSecurityDefinition(ApiKeyRequestFilterAttribute.HeaderName, new OpenApiSecurityScheme
                {
                    Description = "Api key needed to access the endpoints. api-key: My_API_Key",
                    In = ParameterLocation.Header,
                    Name = ApiKeyRequestFilterAttribute.HeaderName,
                    Type = SecuritySchemeType.ApiKey
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Name = ApiKeyRequestFilterAttribute.HeaderName,
                            Type = SecuritySchemeType.ApiKey,
                            In = ParameterLocation.Header,
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = ApiKeyRequestFilterAttribute.HeaderName },
                        },
                        System.Array.Empty<string>()
                    }
                });
            });

            services.AddSwaggerExamplesFromAssemblies();
            services.AddMvc()
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
            app.UseHttpStatusCodeExceptionMiddleware();

            
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Code4Ro.CoViz19.Api V1");
                c.DisplayRequestDuration();
            });
            app.UseCors("Permissive");
            app.UseRouting();

            app.UseAuthorization();
            app.UseHealthChecks("/health");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
