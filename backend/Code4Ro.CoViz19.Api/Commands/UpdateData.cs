using Code4Ro.CoViz19.Models;
using MediatR;

namespace Code4Ro.CoViz19.Api.Commands
{
    public class UpdateData:IRequest<object>
    {
        public ParsedDataModel NewData { get; }

        public UpdateData(ParsedDataModel data)
        {
            NewData = data;
        }
    }
}
