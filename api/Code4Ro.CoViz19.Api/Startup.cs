using Code4Ro.CoViz19.Api.Filters;
using Code4Ro.CoViz19.Api.Middleware;
using Code4Ro.CoViz19.Api.Options;
using Code4Ro.CoViz19.Api.Services;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Reflection;

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
            services.Configure<AuthorizationOptions>(Configuration.GetSection("Authorization"));

            services.AddSingleton<IDataProviderService, DummyDAtaProviderService>();
            services.AddSingleton<ICacheSercice, NoCacheService>();
            services.AddSingleton<IApiKeyProvider, InMemoryGetApiKeyQuery>();
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
                        new string[] {}
                    }
                });
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
