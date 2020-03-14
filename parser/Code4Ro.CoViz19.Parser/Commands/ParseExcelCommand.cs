using Code4Ro.CoViz19.Parser.Models;
using CSharpFunctionalExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Code4Ro.CoViz19.Parser.Commands
{
    public class ParseExcelCommand: IRequest<Result<ParsedDataModel>>
    {
        public IFormFile File { get; }

        public ParseExcelCommand(IFormFile file)
        {
            File = file;
        }
    }
}
