using Code4Ro.CoViz19.Api.Models.V2;
using MediatR;

namespace Code4Ro.CoViz19.Api.Commands.V2
{
    public class GetAverageAge : IRequest<AverageAgeModel>
    {
    }
}
