using Code4Ro.CoViz19.Models;
using CSharpFunctionalExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Code4Ro.CoViz19.Parser.Commands
{
    public class ParseV2ExcelCommand : IRequest<Result<ParsedDataModel>>
    {
        public IFormFile File { get; }

        public ParseV2ExcelCommand(IFormFile file)
        {
            File = file;
        }
    }
}
