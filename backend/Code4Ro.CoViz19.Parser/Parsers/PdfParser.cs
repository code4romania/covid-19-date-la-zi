using System;
using System.Collections.Generic;
using Code4Ro.CoViz19.Models.ParsedPdfModels;

namespace Code4Ro.CoViz19.Parser.Parsers
{
    public class PdfParser
    {
        internal static int ParseNumberInfected(string pdfContents)
        {
            return 0;
        }

        internal static int ParseNumberCured(string pdfContents)
        {
            throw new NotImplementedException();
        }

        internal static int ParseNumberDeceased(string pdfContents)
        {
            throw new NotImplementedException();
        }

        internal static Dictionary<AgeRange, int> ParseDistributionByAge(string pdfContents)
        {
            throw new NotImplementedException();
        }

        internal static int ParseAverageAge(string pdfContents)
        {
            throw new NotImplementedException();
        }
    }
}
