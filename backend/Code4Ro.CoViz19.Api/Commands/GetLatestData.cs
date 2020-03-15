using Code4Ro.CoViz19.Models;
using MediatR;

namespace Code4Ro.CoViz19.Api.Commands
{
    public class GetLatestData: IRequest<ParsedDataModel>
    {
    }
}
