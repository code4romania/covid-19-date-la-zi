using Code4Ro.CoViz19.Models.ParsedPdfModels;
using MediatR;

namespace Code4Ro.CoViz19.Api.Commands.V2
{
    public class GetCachedData : IRequest<HistoricalPdfStats>
    {
    }
}
