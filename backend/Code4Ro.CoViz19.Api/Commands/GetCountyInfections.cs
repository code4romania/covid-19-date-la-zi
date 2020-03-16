using Code4Ro.CoViz19.Api.Models;
using MediatR;

namespace Code4Ro.CoViz19.Api.Commands
{
    public class GetCountyInfections : IRequest<CountyInfectionsModel>
    {
    }
}