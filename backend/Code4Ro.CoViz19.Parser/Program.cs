using Code4Ro.CoViz19.Parser.Filters;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Code4Ro.CoViz19.Parser
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); })
                .ConfigureServices(services =>
                {
                    services.AddControllers(options => { options.Filters.Add<ModelInvalidStateLogger>(); });
                })
                .ConfigureAppConfiguration((hostingContext, config) => { config.AddEnvironmentVariables(); });
    }
}