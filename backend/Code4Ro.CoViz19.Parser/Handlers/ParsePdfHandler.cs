﻿using System;
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
                var result = new DailyPdfStats
                {
                    FileName = request.File.FileName
                };

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
                result.AverageAge = PdfParser.ParseAverageAge(pdfContents);

                result.DistributionByAge = PdfParser.ParseDistributionByAge(pdfContents);
                var parsedOn = PdfParser.TryParsePublishedDate(request.File.FileName);
                result.ParsedOn = new DateTimeOffset(parsedOn).ToUnixTimeSeconds();
                result.ParsedOnString = parsedOn.ToString("yyyy-MM-dd");

                return Result.Ok(result);

            }
            catch (Exception e)
            {
                return Result.Failure<DailyPdfStats>($"{request.File.FileName} -- {e.Message}");
            }
        }
    }
}
