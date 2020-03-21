using Code4Ro.CoViz19.Api.Commands;
using Code4Ro.CoViz19.Api.Handlers;
using Code4Ro.CoViz19.Api.Models;
using Code4Ro.CoViz19.Api.Services;
using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Parser.Commands;
using Code4Ro.CoViz19.Parser.Handlers;
using CSharpFunctionalExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.BulkParser
{

    class Program
    {
        public class TempDataProviderService : IDataProviderService
        {
            public async Task<ParsedDataModel> GetCurrentData()
            {
                await Task.FromResult(true);
                return latestData;
            }
        }

        public static ParsedDataModel latestData = null;
        private static IMediator _mediator;
        static async Task Main(string[] args)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            Console.WriteLine("Hello, I am a bulk parser!");
            Console.WriteLine("Give me the path to folder with MoH excell files and i will give you historical data to the output folder!");

            string pathToInputDirectory = @"C:\Users\Ion\Downloads\Archive";
            string pathToOutputDirectory = @"C:\Users\Ion\Downloads\Archive_parse";

            var serviceProvider = new ServiceCollection()
                                        .AddMediatR(new[] { typeof(Program).GetType().Assembly })
                                        .AddScoped<IRequestHandler<GetLatestData, ParsedDataModel>, DataQueryHandler>()
                                        .AddScoped<IRequestHandler<GetDailyStats, DailyStatsModel>, DataQueryHandler>()
                                        .AddScoped<IRequestHandler<GetGenderStats, GenderStatsModel>, DataQueryHandler>()
                                        .AddScoped<IRequestHandler<GetGenderAgeHistogram, GenderAgeHistogramModel>, DataQueryHandler>()
                                        .AddScoped<IRequestHandler<GetCountyInfections, CountyInfectionsModel>, DataQueryHandler>()
                                        .AddScoped<IRequestHandler<GetInfectionsSource, InfectionsSourceStatisticsModel>, DataQueryHandler>()
                                        .AddScoped<IRequestHandler<GetQuickstatsData, QuickStatsModel>, DataQueryHandler>()
                                        .AddScoped<IRequestHandler<ParseExcelCommand, Result<ParsedDataModel>>, ParseExcelHandler>()
                                        .AddScoped<IDataProviderService, TempDataProviderService>()
                                        .AddScoped<ICacheSercice, NoCacheService>()

.BuildServiceProvider();



            _mediator = serviceProvider.GetService<IMediator>();

            DirectoryInfo d = new DirectoryInfo(pathToInputDirectory);//Assuming Test is your Folder
            FileInfo[] Files = d.GetFiles("*.xlsx"); //Getting Text files
            string str = "";
            if (Files.Length == 0)
            {
                Console.WriteLine("No files to process");
            }
            foreach (FileInfo file in Files)
            {
                DateTime date = GetDateFromFileName(file.Name);
                ParsedDataModel parsedData = await MapFileToParsedModel(file);
                latestData = parsedData;
                await WriteDataToOutput(pathToOutputDirectory, date, parsedData);
            }
        }

        private static async Task WriteDataToOutput(string pathToOutputDirectory, DateTime date, ParsedDataModel parsedData)
        {
            var latestData = await _mediator.Send(new GetLatestData());
            var quickstatsData = await _mediator.Send(new GetQuickstatsData());
            var dailyStats = await _mediator.Send(new GetDailyStats());
            var genderStats = await _mediator.Send(new GetGenderStats());
            var genderAgeHistogram = await _mediator.Send(new GetGenderAgeHistogram());
            var countyInfections = await _mediator.Send(new GetCountyInfections());
            var infectionsSource = await _mediator.Send(new GetInfectionsSource());

            File.WriteAllText(Path.Combine(pathToOutputDirectory, date.ToString($"dd-MM-yyyy") + $"_{nameof(GetLatestData)}.json"), JsonConvert.SerializeObject(latestData));
            File.WriteAllText(Path.Combine(pathToOutputDirectory, date.ToString($"dd-MM-yyyy") + $"_{nameof(GetQuickstatsData)}.json"), JsonConvert.SerializeObject(quickstatsData));
            File.WriteAllText(Path.Combine(pathToOutputDirectory, date.ToString($"dd-MM-yyyy") + $"_{nameof(GetDailyStats)}.json"), JsonConvert.SerializeObject(dailyStats));
            File.WriteAllText(Path.Combine(pathToOutputDirectory, date.ToString($"dd-MM-yyyy") + $"_{nameof(GetGenderStats)}.json"), JsonConvert.SerializeObject(genderStats));
            File.WriteAllText(Path.Combine(pathToOutputDirectory, date.ToString($"dd-MM-yyyy") + $"_{nameof(GetGenderAgeHistogram)}.json"), JsonConvert.SerializeObject(genderAgeHistogram));
            File.WriteAllText(Path.Combine(pathToOutputDirectory, date.ToString($"dd-MM-yyyy") + $"_{nameof(GetCountyInfections)}.json"), JsonConvert.SerializeObject(countyInfections));
            File.WriteAllText(Path.Combine(pathToOutputDirectory, date.ToString($"dd-MM-yyyy") + $"_{nameof(GetInfectionsSource)}.json"), JsonConvert.SerializeObject(infectionsSource));
        }

        private async static Task<ParsedDataModel> MapFileToParsedModel(FileInfo file)
        {
            var result = await _mediator.Send(new ParseExcelCommand(GetFormFile(file)));

            if (result.IsSuccess)
            {
                return result.Value;
            }

            throw new Exception(result.Error);
        }

        private static IFormFile GetFormFile(FileInfo file)
        {
            var fileInfo = new FileInfo(file.Name);
            var stream = File.OpenRead(file.FullName);
            var formFile = new FormFile(stream, 0, stream.Length, null, fileInfo.Name)
            {
                Headers = new HeaderDictionary(),
                ContentType = "application/pdf"
            };

            return formFile;
        }

        private static DateTime GetDateFromFileName(string name)
        {
            DateTime dateTime = DateTime.Parse(name.Replace(".xlsx", ""));
            return dateTime;
        }
    }
}
