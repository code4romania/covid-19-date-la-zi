using System;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Models.ParsedPdfModels;
using Code4Ro.CoViz19.Parser.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Parser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParserController : ControllerBase
    {
        private const string PdfExtension = ".pdf";
        private readonly IMediator _mediatr;

        public ParserController(IMediator mediatr)
        {
            _mediatr = mediatr;
        }

        [HttpPost]
        [Route("/upload")]
        public async Task<ActionResult<ParsedDataModel>> ParseExcel(IFormFile file)
        {
            if (file == null)
            {
                return BadRequest("Upload Failed, no file(s) selected.");
            }

            var result = await _mediatr.Send(new ParseExcelCommand(file));

            if (result.IsSuccess)
            {
                await _mediatr.Send(new SaveParsedDataCommand(JsonConvert.SerializeObject(result.Value)));
                return new OkObjectResult(result.Value);
            }

            return BadRequest(result.Error);
        }

        [HttpPost]
        [Route("/v2/upload")]
        public async Task<ActionResult<ParsedDataModel>> ParseExcelNewFormat(IFormFile file)
        {
            if (file == null)
            {
                return BadRequest("Upload Failed, no file(s) selected.");
            }

            var result = await _mediatr.Send(new ParseV2ExcelCommand(file));

            if (result.IsSuccess)
            {
                await _mediatr.Send(new SaveParsedDataCommand(JsonConvert.SerializeObject(result.Value)));
                return new OkObjectResult(result.Value);
            }

            return BadRequest(result.Error);
        }

        [HttpPost]
        [Route("/v3/upload")]
        public async Task<ActionResult<ParsedDataModel>> ParsePdfFormat(IFormFile file)
        {
            if (file == null)
            {
                return BadRequest("Upload Failed, no file(s) selected.");
            }

            if (!file.FileName.Contains(PdfExtension, StringComparison.InvariantCultureIgnoreCase))
            {
                return BadRequest("File is not a PDF.");
            }

            var result = await _mediatr.Send(new ParsePdfCommand(file));

            if (result.IsSuccess)
            {
                var saveResult = await _mediatr.Send(new SavePdfParsedDataCommand(result.Value));

                if (saveResult.IsSuccess)
                {
                    return new OkObjectResult(saveResult);
                }
                else
                {
                    return Problem("Error saving historical data to storage");
                }
            }

            return BadRequest(result.Error);
        }


        [HttpPost]
        [Route("/v3/pdf-to-json")]
        public async Task<ActionResult<ParsedDataModel>> TransformPdfToJson(IFormFile file)
        {
            if (file == null)
            {
                return BadRequest("Upload Failed, no file(s) selected.");
            }

            if (!file.FileName.Contains(PdfExtension, StringComparison.InvariantCultureIgnoreCase))
            {
                return BadRequest("File is not a PDF.");
            }

            var result = await _mediatr.Send(new ParsePdfCommand(file));

            if (result.IsSuccess)
            {
                return new OkObjectResult(result.Value);
            }

            return BadRequest(result.Error);
        }


        [HttpPost]
        [Route("/v3/upload-json")]
        public async Task<ActionResult<ParsedDataModel>> UploadLatestData([FromBody]DailyPdfStats data)
        {
            if (data == null)
            {
                return BadRequest("Upload Failed, no file(s) selected.");
            }


            var saveResult = await _mediatr.Send(new SavePdfParsedDataCommand(data));


            if (saveResult.IsSuccess)
            {
                return new OkObjectResult(saveResult.Value);
            }

            return BadRequest(saveResult.Error);
        }


    }
}