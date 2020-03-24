using Code4Ro.CoViz19.Models.ParsedPdfModels;
using CSharpFunctionalExtensions;
using MediatR;

namespace Code4Ro.CoViz19.Parser.Commands
{
    public class SavePdfParsedDataCommand : IRequest<Result<HistoricalPdfStats>>
    {
        public DailyPdfStats NewStats;

        public SavePdfParsedDataCommand(DailyPdfStats newStats)
        {
            NewStats = newStats;
        }
    }
}
