using Code4Ro.CoViz19.Models.ParsedPdfModels;
using Code4Ro.CoViz19.Parser.Parsers;
using Shouldly;
using System;
using System.Collections.Generic;
using System.IO;
using Xunit;

namespace Code4Ro.CoViz19.Parser.UnitTests
{
    public class PdfParserShould
    {
        private static Dictionary<string, string> _resourceDictionary = new Dictionary<string, string>();

        [Theory]
        [InlineData("TextInPdf_Coronavirus 17.03.pdf.txt", 217)]
        [InlineData("TextInPdf_Coronavirus 18.03.pdf.txt", 260)]
        [InlineData("TextInPdf_Coronavirus 19.03.pdf.txt", 277)]
        [InlineData("TextInPdf_Coronavirus 20.03.pdf.txt", 308)]
        [InlineData("TextInPdf_Coronavirus 21.03.pdf.txt", 367)]
        [InlineData("TextInPdf_Coronavirus 22.03.pdf.txt", 433)]
        [InlineData("TextInPdf_Coronavirus 23.03.pdf.txt", 576)]
        public void Parse_number_of_infections_correctly(string file, int expectedMap)
        {
            var pdfText = LoadResource(file);
            PdfParser.ParseNumberInfected(pdfText).ShouldBe(expectedMap);
        }

        [Theory]
        [InlineData("TextInPdf_Coronavirus 17.03.pdf.txt", 19)]
        [InlineData("TextInPdf_Coronavirus 18.03.pdf.txt", 19)]
        [InlineData("TextInPdf_Coronavirus 19.03.pdf.txt", 25)]
        [InlineData("TextInPdf_Coronavirus 20.03.pdf.txt", 31)]
        [InlineData("TextInPdf_Coronavirus 21.03.pdf.txt", 52)]
        [InlineData("TextInPdf_Coronavirus 22.03.pdf.txt", 64)]
        [InlineData("TextInPdf_Coronavirus 23.03.pdf.txt", 73)]
        public void Parse_number_of_cured_correctly(string file, int expectedMap)
        {
            var pdfText = LoadResource(file);
            PdfParser.ParseNumberCured(pdfText).ShouldBe(expectedMap);
        }

        [Theory]
        [InlineData("TextInPdf_Coronavirus 17.03.pdf.txt", 0)]
        [InlineData("TextInPdf_Coronavirus 18.03.pdf.txt", 0)]
        [InlineData("TextInPdf_Coronavirus 19.03.pdf.txt", 0)]
        [InlineData("TextInPdf_Coronavirus 20.03.pdf.txt", 0)]
        [InlineData("TextInPdf_Coronavirus 21.03.pdf.txt", 0)]
        [InlineData("TextInPdf_Coronavirus 22.03.pdf.txt", 2)]
        [InlineData("TextInPdf_Coronavirus 23.03.pdf.txt", 4)]
        public void Parse_number_of_deaths_correctly(string file, int expectedMap)
        {
            var pdfText = LoadResource(file);
            PdfParser.ParseNumberDeceased(pdfText).ShouldBe(expectedMap);
        }

        [Theory]
        [InlineData("TextInPdf_Coronavirus 17.03.pdf.txt", "39-40")]
        [InlineData("TextInPdf_Coronavirus 18.03.pdf.txt", "41")]
        [InlineData("TextInPdf_Coronavirus 19.03.pdf.txt", "41")]
        [InlineData("TextInPdf_Coronavirus 20.03.pdf.txt", "41")]
        [InlineData("TextInPdf_Coronavirus 21.03.pdf.txt", "41")]
        [InlineData("TextInPdf_Coronavirus 22.03.pdf.txt", "41")]
        [InlineData("TextInPdf_Coronavirus 23.03.pdf.txt", "42")]
        public void Parse_average_age_correctly(string file, string expectedMap)
        {
            var pdfText = LoadResource(file);
            PdfParser.ParseAverageAge(pdfText).ShouldBe(expectedMap);
        }

        [Theory]
        [InlineData("TextInPdf_Coronavirus 17.03.pdf.txt")]
        [InlineData("TextInPdf_Coronavirus 18.03.pdf.txt")]
        [InlineData("TextInPdf_Coronavirus 19.03.pdf.txt")]
        [InlineData("TextInPdf_Coronavirus 20.03.pdf.txt")]
        [InlineData("TextInPdf_Coronavirus 21.03.pdf.txt")]
        [InlineData("TextInPdf_Coronavirus 22.03.pdf.txt")]
        [InlineData("TextInPdf_Coronavirus 23.03.pdf.txt")]
        public void Parse_age_distribution_correctly(string file)
        {
            var pdfText = LoadResource(file);
            var expectedDictionary = GetExpectedAgeDistributionForFile(file);
            var distribution = PdfParser.ParseDistributionByAge(pdfText);
            expectedDictionary.Keys.ShouldBe(distribution.Keys);

            foreach (var key in expectedDictionary.Keys)
            {
                distribution[key].ShouldBe(expectedDictionary[key], $"{key} does not match");
            }

        }

        [Theory]
        [InlineData("TextInPdf_Coronavirus 17.03.pdf", 17, 3)]
        [InlineData("TextInPdf_Coronavirus 18.03.pdf", 18, 3)]
        [InlineData("TextInPdf_Coronavirus 19.03.pdf", 19, 3)]
        [InlineData("TextInPdf_Coronavirus 20.03.pdf", 20, 3)]
        [InlineData("TextInPdf_Coronavirus 21.03.pdf", 21, 3)]
        [InlineData("TextInPdf_Coronavirus 22.03.pdf", 22, 3)]
        [InlineData("TextInPdf_Coronavirus 23.03.pdf", 23, 3)]
        [InlineData("Coronavirus 21.03 (1).pdf", 21, 3)]
        [InlineData("Coronavirus 1.03 (1).pdf", 1, 3)]
        [InlineData("Coronavirus 02.03 (1).pdf", 2, 3)]
        [InlineData("Coronavirus 02.12 (1).pdf", 2, 12)]
        public void Parse_date_from_file_name_correctly(string fileName, int expectedDay, int expectedMonth)
        {
            PdfParser.TryParsePublishedDate(fileName).ShouldBe(new DateTime(DateTime.Now.Year, expectedMonth, expectedDay));
        }

        private Dictionary<AgeRange, int> GetExpectedAgeDistributionForFile(string file)
        {
            if (file == "TextInPdf_Coronavirus 17.03.pdf.txt")
            {
                var pdf1703 = new Dictionary<AgeRange, int>()
                {
                    { AgeRange.Age09, 4},
                    { AgeRange.Age1019, 8},
                    { AgeRange.Age2029, 30},
                    { AgeRange.Age3039, 53},
                    { AgeRange.Age4049, 60},
                    { AgeRange.Age5059, 44},
                    { AgeRange.Age6069, 11},
                    { AgeRange.Age7079, 7},
                    { AgeRange.AgeOver80, 0},
                };
                return pdf1703;
            }
            if (file == "TextInPdf_Coronavirus 18.03.pdf.txt")
            {
                var pdf1803 = new Dictionary<AgeRange, int>()
                 {
                    { AgeRange.Age09, 6},
                    { AgeRange.Age1019, 10},
                    { AgeRange.Age2029, 32},
                    { AgeRange.Age3039, 67},
                    { AgeRange.Age4049, 75},
                    { AgeRange.Age5059, 49},
                    { AgeRange.Age6069, 12},
                    { AgeRange.Age7079, 9},
                    { AgeRange.AgeOver80, 0},
                };
                return pdf1803;
            }
            if (file == "TextInPdf_Coronavirus 19.03.pdf.txt")
            {
                var pdf1903 = new Dictionary<AgeRange, int>()
                 {
                    { AgeRange.Age09, 6},
                    { AgeRange.Age1019, 11},
                    { AgeRange.Age2029, 33},
                    { AgeRange.Age3039, 73},
                    { AgeRange.Age4049, 78},
                    { AgeRange.Age5059, 54},
                    { AgeRange.Age6069, 13},
                    { AgeRange.Age7079, 9},
                    { AgeRange.AgeOver80, 0},
                };
                return pdf1903;
            }
            if (file == "TextInPdf_Coronavirus 20.03.pdf.txt")
            {
                var pdf2003 = new Dictionary<AgeRange, int>()
                 {
                    { AgeRange.Age09, 6},
                    { AgeRange.Age1019, 12},
                    { AgeRange.Age2029, 39},
                    { AgeRange.Age3039, 80},
                    { AgeRange.Age4049, 85},
                    { AgeRange.Age5059, 58},
                    { AgeRange.Age6069, 15},
                    { AgeRange.Age7079, 12},
                    { AgeRange.AgeOver80, 1},
                };
                return pdf2003;
            }
            if (file == "TextInPdf_Coronavirus 21.03.pdf.txt")
            {
                var pdf2103 = new Dictionary<AgeRange, int>()
                 {
                    { AgeRange.Age09, 7},
                    { AgeRange.Age1019, 14},
                    { AgeRange.Age2029, 51},
                    { AgeRange.Age3039, 94},
                    { AgeRange.Age4049, 96},
                    { AgeRange.Age5059, 67},
                    { AgeRange.Age6069, 22},
                    { AgeRange.Age7079, 15},
                    { AgeRange.AgeOver80, 1},
                };
                return pdf2103;
            }
            if (file == "TextInPdf_Coronavirus 22.03.pdf.txt")
            {
                var pdf2203 = new Dictionary<AgeRange, int>()
                 {
                    { AgeRange.Age09, 8},
                    { AgeRange.Age1019, 19},
                    { AgeRange.Age2029, 60},
                    { AgeRange.Age3039, 110},
                    { AgeRange.Age4049, 112},
                    { AgeRange.Age5059, 79},
                    { AgeRange.Age6069, 27},
                    { AgeRange.Age7079, 17},
                    { AgeRange.AgeOver80, 1},
                };
                return pdf2203;
            }
            if (file == "TextInPdf_Coronavirus 23.03.pdf.txt")
            {
                var pdf2303 = new Dictionary<AgeRange, int>()
                {
                    { AgeRange.Age09, 10},
                    { AgeRange.Age1019, 20},
                    { AgeRange.Age2029, 74},
                    { AgeRange.Age3039, 135},
                    { AgeRange.Age4049, 165},
                    { AgeRange.Age5059, 101},
                    { AgeRange.Age6069, 46},
                    { AgeRange.Age7079, 24},
                    { AgeRange.AgeOver80, 1},
                };
                return pdf2303;
            }


            throw new ArgumentException("Could not map file to expected dictionary");
        }

        private string LoadResource(string resource)
        {
            return File.ReadAllText($"PdfTexts{Path.DirectorySeparatorChar}{resource}");
        }
    }
}
