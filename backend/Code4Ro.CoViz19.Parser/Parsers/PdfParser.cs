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

            var result = ExtractByPattern(pattern, pdfContents);

            return StringToNumber(result);
        }

        public static int ParseNumberCured(string pdfContents)
        {
            const string pattern = @"(\d+) cazuri vindecate";

            var result = ExtractByPattern(pattern, pdfContents);

            return StringToNumber(result);
        }

        public static int ParseNumberDeceased(string pdfContents)
        {
            const string pattern = @"(\d+) decese";

            var result = ExtractByPattern(pattern, pdfContents);

            return StringToNumber(result);
        }

        public static Dictionary<AgeRange, int> ParseDistributionByAge(string pdfContents)
        {
            return new Dictionary<AgeRange, int>()
            {
                { AgeRange.Age09, StringToNumber(ExtractByPattern(@"0-9\s*(\d+)\s*\(\d+%\)", pdfContents))},
                { AgeRange.Age1019, StringToNumber(ExtractByPattern(@"10-19\s*(\d+)\s*\(\d+%\)", pdfContents) )},
                { AgeRange.Age2029, StringToNumber(ExtractByPattern(@"20-29\s*(\d+)\s*\(\d+%\)", pdfContents) )},
                { AgeRange.Age3039, StringToNumber(ExtractByPattern(@"30-39\s*(\d+)\s*\(\d+%\)", pdfContents) )},
                { AgeRange.Age4049, StringToNumber(ExtractByPattern(@"40-49\s*(\d+)\s*\(\d+%\)", pdfContents) )},
                { AgeRange.Age5059, StringToNumber(ExtractByPattern(@"50-59\s*(\d+)\s*\(\d+%\)", pdfContents) )},
                { AgeRange.Age6069, StringToNumber(ExtractByPattern(@"60-69\s*(\d+)\s*\(\d+%\)", pdfContents) )},
                { AgeRange.Age7079, StringToNumber(ExtractByPattern(@"70-79\s*(\d+)\s*\(\d+%\)", pdfContents) )},
                { AgeRange.AgeOver80, StringToNumber(ExtractByPattern(@">80\s*(\d+)\s*\(\d+%\)", pdfContents) )},
            };
        }

        public static string ParseAverageAge(string pdfContents)
        {
            const string pattern = @"medie (\w+\s*\-\s*\w+|\w+) ani";

            var result = ExtractByPattern(pattern, pdfContents);

            return result;
        }

        private static string ExtractByPattern(string pattern, string text)
        {
            var regex = new Regex(pattern, RegexOptions.IgnoreCase | RegexOptions.Compiled);
            var match = regex.Matches(text);
            if (match.Count > 0)
            {
                return match[0].Groups[1].Value;
            }
            return null;
        }

        private static int StringToNumber(string input)
        {
            return !string.IsNullOrEmpty(input) ? int.Parse(input) : -1;
        }
    }
}
