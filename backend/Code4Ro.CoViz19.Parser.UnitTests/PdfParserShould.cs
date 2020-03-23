using Code4Ro.CoViz19.Parser.Parsers;
using Shouldly;
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
        
        private  string LoadResource(string resource)
        {           
            return File.ReadAllText($"PdfTexts\\{resource}");
        }
    }
}
