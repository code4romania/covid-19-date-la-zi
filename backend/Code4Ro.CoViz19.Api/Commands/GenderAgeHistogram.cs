using Code4Ro.CoViz19.Api.Models;
using MediatR;

namespace Code4Ro.CoViz19.Api.Commands
{
    public class GetGenderAgeHistogram:IRequest<GenderAgeHistogramModel>
    {
    }
}
