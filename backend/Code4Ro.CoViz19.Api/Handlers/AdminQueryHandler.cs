using Code4Ro.CoViz19.Api.Commands;
using MediatR;
using System;

using System.Threading;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Api.Handlers
{
    public class AdminQueryHandler : IRequestHandler<UpdateData, object>
    {
        public async Task<object> Handle(UpdateData request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(true);
        }
    }
}
