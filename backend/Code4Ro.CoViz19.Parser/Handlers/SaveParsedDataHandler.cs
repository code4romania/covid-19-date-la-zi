using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Models.ParsedPdfModels;
using Code4Ro.CoViz19.Parser.Commands;
using Code4Ro.CoViz19.Services;
using CSharpFunctionalExtensions;
using MediatR;

namespace Code4Ro.CoViz19.Parser.Handlers
{
    public class SaveParsedDataHandler : IRequestHandler<SaveParsedDataCommand, Result<bool>> {
        private readonly IFileService _fileService;

        public SaveParsedDataHandler(IFileService fileService)
        {
            _fileService = fileService;
        }

        public async Task<Result<bool>> Handle(SaveParsedDataCommand request, CancellationToken cancellationToken)
        {
            var previousJson = _fileService.GetRawData();
            var previousDayData = string.IsNullOrEmpty(previousJson) ? null 
                : JsonSerializer.Deserialize<HistoricalPdfStats>(previousJson);

            var currentDayData = JsonSerializer.Deserialize<DailyPdfStats>(request.FileContent);
            var updatedHistoricalData = new HistoricalPdfStats(currentDayData, previousDayData);

            var updatedJson = JsonSerializer.Serialize(updatedHistoricalData);

            await _fileService.SaveRawData(updatedJson);
            return Result.Success(true);
        }
    }
}
