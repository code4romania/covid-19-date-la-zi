﻿using System.Threading.Tasks;
using Code4Ro.CoViz19.Models;
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
    }
}