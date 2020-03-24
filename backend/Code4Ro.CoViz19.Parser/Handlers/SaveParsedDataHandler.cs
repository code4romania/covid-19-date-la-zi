using System.Threading;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Parser.Commands;
using Code4Ro.CoViz19.Services;
using CSharpFunctionalExtensions;
using MediatR;

namespace Code4Ro.CoViz19.Parser.Handlers
{
    public class SaveParsedDataHandler : IRequestHandler<SaveParsedDataCommand, Result<bool>>
    {
        private readonly IFileService _fileService;

        public SaveParsedDataHandler(IFileService fileService)
        {
            _fileService = fileService;
        }

        public async Task<Result<bool>> Handle(SaveParsedDataCommand request, CancellationToken cancellationToken)
        {
            await _fileService.SaveRawData(request.FileContent);
            return Result.Success(true);
        }
    }
}
