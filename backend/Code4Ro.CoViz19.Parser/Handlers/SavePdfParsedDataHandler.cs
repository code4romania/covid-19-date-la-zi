using System.Threading;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Models.ParsedPdfModels;
using Code4Ro.CoViz19.Parser.Commands;
using Code4Ro.CoViz19.Services;
using CSharpFunctionalExtensions;
using MediatR;
using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Parser.Handlers
{
    public class SavePdfParsedDataHandler : IRequestHandler<SavePdfParsedDataCommand, Result<HistoricalPdfStats>>
    {
        private readonly IFileService _fileService;

        public SavePdfParsedDataHandler(IFileService fileService)
        {
            _fileService = fileService;
        }

        public async Task<Result<HistoricalPdfStats>> Handle(SavePdfParsedDataCommand request, CancellationToken cancellationToken)
        {
            var previousJson = await _fileService.GetRawData();
            var previousDayData = string.IsNullOrEmpty(previousJson) ? null
                : JsonConvert.DeserializeObject<HistoricalPdfStats>(previousJson);

            var updatedHistoricalData = new HistoricalPdfStats(request.NewStats, previousDayData);
            var updatedJson = JsonConvert.SerializeObject(updatedHistoricalData);

            await _fileService.SaveRawData(updatedJson);
            return Result.Success(updatedHistoricalData);
        }
    }
}
