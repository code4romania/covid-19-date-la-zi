using Code4Ro.CoViz19.Api.Commands;
using Code4Ro.CoViz19.Api.Filters;
using Code4Ro.CoViz19.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Api.Controllers
{
    [ApiController]
    [Route("api/v1/admin")]
    [Produces("application/json")]
    public class AdminController : Controller
    {
        private readonly IMediator _mediator;

        public AdminController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        [Route("update")]
        [ApiKeyRequestFilterFactory]
        public async Task<IActionResult> UpdateData([FromBody]ParsedDataModel data)
        {
            await _mediator.Send(new UpdateData(data));
     
            return new OkObjectResult(new { message= "all good" });
        }
    }
}