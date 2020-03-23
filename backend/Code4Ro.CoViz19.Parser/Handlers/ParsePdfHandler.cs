using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Models.ParsedPdfModels;
using Code4Ro.CoViz19.Parser.Commands;
using Code4Ro.CoViz19.Parser.Parsers;
using CSharpFunctionalExtensions;
using MediatR;
using Spire.Pdf;

namespace Code4Ro.CoViz19.Parser.Handlers
{
    public class ParsePdfHandler : IRequestHandler<ParsePdfCommand, Result<DailyPdfStats>>
    {
        public async Task<Result<DailyPdfStats>> Handle(ParsePdfCommand request, CancellationToken cancellationToken)
        {
            await Task.FromResult(true);

            try
            {
                var result = new DailyPdfStats();

                var buffer = new StringBuilder();
                using (var stream = request.File.OpenReadStream())
                {
                    var doc = new PdfDocument(stream);
                    foreach (PdfPageBase page in doc.Pages)
                    {
                        buffer.Append(page.ExtractText());
                    }
                }

                var pdfContents = buffer.ToString();
                result.NumberInfected = PdfParser.ParseNumberInfected(pdfContents);
                result.NumberDeceased = PdfParser.ParseNumberDeceased(pdfContents);
                result.NumberCured = PdfParser.ParseNumberCured(pdfContents);
                result.AgerageAge = PdfParser.ParseAverageAge(pdfContents);

                result.DistributionByAge = PdfParser.ParseDistributionByAge(pdfContents);
                result.ParsedOnString = DateTime.Today.ToString();
                result.ParsedOn = new DateTimeOffset(DateTime.Today).ToUnixTimeSeconds();

                return Result.Ok(result);

            }
            catch (Exception e)
            {
                return Result.Failure<DailyPdfStats>(e.Message);
            }
        }
    }
}
