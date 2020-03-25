using Code4Ro.CoViz19.Api.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Api.Commands.V2;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Filters;
using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Api.Swagger;
using Code4Ro.CoViz19.Api.Models;
using Code4Ro.CoViz19.Api.Models.V2;
using Code4Ro.CoViz19.Models.ParsedPdfModels;

namespace Code4Ro.CoViz19.Api.Controllers
{
    [ApiController]
    [Route("api/v2/data")]
    [Produces("application/json")]
    [SwaggerTag("Enpoint for provinding latest relevant data")]
    public class FrontendDataController : Controller
    {
        private readonly IMediator _mediator;
        public FrontendDataController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Get latest data provided by Ministry of Health")]
        [SwaggerResponse(200, "Latest data", typeof(HistoricalPdfStats))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        [SwaggerResponseExample(200, typeof(LatestDataExample))]
        public async Task<IActionResult> GetLatestData()
        {
            var data = await _mediator.Send(new GetLatestDataV2());
            return new OkObjectResult(data);
        }

        [HttpGet]
        [Route("dailystats")]
        [SwaggerOperation(Summary = "Get dailystats data provided by Ministry of Health")]
        [SwaggerResponse(200, "Dailystats data", typeof(DailyStatsV2Model))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetDailystats()
        {
            var data = await _mediator.Send(new GetDailyStatsV2());
            return new OkObjectResult(data);
        }

        [HttpGet]
        [Route("genderstats")]
        [SwaggerOperation(Summary = "Get statistics of patients gender ,data provided by Ministry of Health")]
        [SwaggerResponse(200, "GetGenderStats data", typeof(GenderStatsV2Model))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetGenderStats()
        {
            var data = await _mediator.Send(new GetGenderStatsV2());
            return new OkObjectResult(data);
        }

        [HttpGet]
        [Route("age-histogram")]
        [SwaggerOperation(Summary = "Get histogram of age gender of patients data provided by Ministry of Health")]
        [SwaggerResponse(200, "GetGenderStats data", typeof(AgeHistogramV2Model))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetAgeHistogram()
        {
            var data = await _mediator.Send(new GetAgeHistogramV2());
            return new OkObjectResult(data);
        }

        [HttpGet]
        [Route("quickstats")]
        [SwaggerOperation(Summary = "Get quickstats data provided by Ministry of Health")]
        [SwaggerResponse(200, "Quickstats data", typeof(QuickStatsV2Model))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetQuickStatsData()
        {
            var data = await _mediator.Send(new GetQuickstatsV2Data());
            return new OkObjectResult(data);
        }

        [HttpGet]
        [Route("last-update-date")]
        [SwaggerOperation(Summary = "Get date and time when data was updated")]
        [SwaggerResponse(200, "Last date data was updated", typeof(LastDataUpdateDetailsModel))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetLastUpdateDate()
        {
            var data = await _mediator.Send(new GetLastDataUpdateDetails());
            return new OkObjectResult(data);
        }


    }
}