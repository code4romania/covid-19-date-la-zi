using Code4Ro.CoViz19.Api.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Filters;
using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Api.Swagger;
using Code4Ro.CoViz19.Api.Models;

namespace Code4Ro.CoViz19.Api.Controllers
{
    [ApiController]
    [Route("api/v1/data")]
    [Produces("application/json")]
    [SwaggerTag("Enpoint for provinding latest relevant data")]
    public class DataController : Controller
    {
        private readonly IMediator _mediator;
        public DataController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Get latest data provided by Ministry of Health")]
        [SwaggerResponse(200, "Latest data", typeof(ParsedDataModel))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        [SwaggerResponseExample(200, typeof(LatestDataExample))]
        public async Task<IActionResult> GetLatestData()
        {
            var data = await _mediator.Send(new GetLatestData());
            return new OkObjectResult(data);
        }

        [HttpGet]
        [Route("quickstats")]
        [SwaggerOperation(Summary = "Get quickstats data provided by Ministry of Health")]
        [SwaggerResponse(200, "Quickstats data", typeof(QuickStatsModel))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetQuickStatsDataAsycn()
        {
            var data = await _mediator.Send(new GetQuickstatsData());
            return new OkObjectResult(data);
        }

        [HttpGet]
        [Route("dailystats")]
        [SwaggerOperation(Summary = "Get dailystats data provided by Ministry of Health")]
        [SwaggerResponse(200, "Dailystats data", typeof(DailyStatsModel))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetDailystats()
        {
            var data = await _mediator.Send(new GetDailyStats());
            return new OkObjectResult(data);
        }

        [HttpGet]
        [Route("genderstats")]
        [SwaggerOperation(Summary = "Get statistics of patients gender ,data provided by Ministry of Health")]
        [SwaggerResponse(200, "GetGenderStats data", typeof(GenderStatsModel))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetGenderStats()
        {
            var data = await _mediator.Send(new GetGenderStats());
            return new OkObjectResult(data);
        }

        [HttpGet]
        [Route("gender-age-histogram")]
        [SwaggerOperation(Summary = "Get histogram of age gender of patients data provided by Ministry of Health")]
        [SwaggerResponse(200, "GetGenderStats data", typeof(GenderAgeHistogramModel))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetGenderAgeHistogram()
        {
            var data = await _mediator.Send(new GetGenderAgeHistogram());
            return new OkObjectResult(data);
        }

        [HttpGet]
        [Route("county-infections")]
        [SwaggerOperation(Summary = "Get number of infections for each county data provided by Ministry of Health")]
        [SwaggerResponse(200, "CountyInfections data", typeof(CountyInfectionsModel))]
        [SwaggerResponse(500, "Something went wrong when getting data", typeof(ErrorModel))]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetCountyInfectionsAsync()
        {
            var data = await _mediator.Send(new GetCountyInfections());
            return new OkObjectResult(data);
        }
    }
}