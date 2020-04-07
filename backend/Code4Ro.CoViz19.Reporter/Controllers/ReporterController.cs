using Code4Ro.CoViz19.Reporter.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Code4Ro.CoViz19.Reporter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReporterController : ControllerBase
    {
        private readonly ILogger<ReporterController> _logger;

        public ReporterController(ILogger<ReporterController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentLog = FileLoggerService.GetCurrentLog();
            return Content(currentLog);
        }
    }
}
