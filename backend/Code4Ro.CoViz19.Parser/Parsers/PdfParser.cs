using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Code4Ro.CoViz19.Models.ParsedPdfModels;

namespace Code4Ro.CoViz19.Parser.Parsers
{
    public class PdfParser
    {
        public static int ParseNumberInfected(string pdfContents)
        {
            const string pattern = @"(\d+) cazuri diagnosticate covid";

            var result = ExtractNumberByPattern(pattern, pdfContents);

            return result ?? -1;
        }        

        public static int ParseNumberCured(string pdfContents)
        {
            const string pattern = @"(\d+) cazuri vindecate";

            var result = ExtractNumberByPattern(pattern, pdfContents);

            return result ?? -1;
        }

        public static int ParseNumberDeceased(string pdfContents)
        {
            const string pattern = @"(\d+) decese";

            var result = ExtractNumberByPattern(pattern, pdfContents);

            return result ?? -1;
        }

        public static Dictionary<AgeRange, int> ParseDistributionByAge(string pdfContents)
        {
            return new Dictionary<AgeRange, int>()
            {
                { AgeRange.Age09, 8}
            };
        }

        public static int ParseAverageAge(string pdfContents)
        {
            const string pattern = @"medie (\d+) ani";

            var result = ExtractNumberByPattern(pattern, pdfContents);

            return result ?? -1;
        }

        private static int? ExtractNumberByPattern(string pattern, string text)
        {
            var regex = new Regex(pattern, RegexOptions.IgnoreCase | RegexOptions.Compiled);
            var match = regex.Matches(text);
            if (match.Count > 0)
            {
                return int.Parse(match[0].Groups[1].Value);
            }
            return null;
        }
    }
}
