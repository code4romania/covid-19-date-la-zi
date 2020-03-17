using Code4Ro.CoViz19.Models;
using CSharpFunctionalExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Code4Ro.CoViz19.Parser.Commands
{
    public class SaveParsedDataCommand : IRequest<Result<bool>>
    {
        public string FileContent { get; }

        public SaveParsedDataCommand(string fileContent)
        {
            FileContent = fileContent;
        }
    }
}
