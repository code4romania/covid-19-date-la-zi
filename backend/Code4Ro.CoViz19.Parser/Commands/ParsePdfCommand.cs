using Code4Ro.CoViz19.Models.ParsedPdfModels;
using CSharpFunctionalExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Code4Ro.CoViz19.Parser.Commands
{
    public class ParsePdfCommand : IRequest<Result<DailyPdfStats>>
    {
        public IFormFile File { get; }

        public ParsePdfCommand(IFormFile file)
        {
            File = file;
        }
    }
}
