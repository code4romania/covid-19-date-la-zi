using Code4Ro.CoViz19.Parser.Parsers;
using Shouldly;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Xunit;

namespace Code4Ro.CoViz19.Parser.UnitTests
{
    public class PdfParserShould
    {
        private static Dictionary<string, string> _resourceDictionary = new Dictionary<string, string>();

        [Theory]
        [MemberData(nameof(PdfInfectionsData))]
        public void Parse_number_of_infections_correctly(string pdfText, int expectedMap)
        {
            PdfParser.ParseNumberInfected(pdfText).ShouldBe(expectedMap);
        }

        public static IEnumerable<object[]> PdfInfectionsData()
        {
            return new (string pdfText, int number)[] {
                (LoadResource("TextInPdf_Coronavirus 17.03.pdf.txt"), 25 ),
                (LoadResource("TextInPdf_Coronavirus 18.03.pdf.txt"), 25 ),
                (LoadResource("TextInPdf_Coronavirus 19.03.pdf.txt"), 25 ),
                (LoadResource("TextInPdf_Coronavirus 20.03.pdf.txt"), 25 ),
                (LoadResource("TextInPdf_Coronavirus 21.03.pdf.txt"), 25 ),
                (LoadResource("TextInPdf_Coronavirus 22.03.pdf.txt"), 25 ),
                (LoadResource("TextInPdf_Coronavirus 23.03.pdf.txt"), 25 ),
            }.Select(t => new object[] { t.pdfText, t.number });
        }

        [Theory]
        [MemberData(nameof(PdfCuredData))]
        public void Parse_number_of_cured_correctly(string pdfText, int expectedMap)
        {
            PdfParser.ParseNumberInfected(pdfText).ShouldBe(expectedMap);
        }

        public static IEnumerable<object[]> PdfCuredData()
        {
            return new (string pdfText, int number)[] {
                (LoadResource("TextInPdf_Coronavirus 17.03.pdf.txt"), 35 ),
                (LoadResource("TextInPdf_Coronavirus 18.03.pdf.txt"), 35 ),
                (LoadResource("TextInPdf_Coronavirus 19.03.pdf.txt"), 35 ),
                (LoadResource("TextInPdf_Coronavirus 20.03.pdf.txt"), 35 ),
                (LoadResource("TextInPdf_Coronavirus 21.03.pdf.txt"), 35 ),
                (LoadResource("TextInPdf_Coronavirus 22.03.pdf.txt"), 35 ),
                (LoadResource("TextInPdf_Coronavirus 23.03.pdf.txt"), 35 ),
            }.Select(t => new object[] { t.pdfText, t.number });
        }

        [Theory]
        [MemberData(nameof(PdfDeathData))]
        public void Parse_number_of_deaths_correctly(string pdfText, int expectedMap)
        {
            PdfParser.ParseNumberInfected(pdfText).ShouldBe(expectedMap);
        }

        public static IEnumerable<object[]> PdfDeathData()
        {
            return new (string pdfText, int number)[] {
                (LoadResource("TextInPdf_Coronavirus 17.03.pdf.txt"), 45 ),
                (LoadResource("TextInPdf_Coronavirus 18.03.pdf.txt"), 45 ),
                (LoadResource("TextInPdf_Coronavirus 19.03.pdf.txt"), 45 ),
                (LoadResource("TextInPdf_Coronavirus 20.03.pdf.txt"), 45 ),
                (LoadResource("TextInPdf_Coronavirus 21.03.pdf.txt"), 45 ),
                (LoadResource("TextInPdf_Coronavirus 22.03.pdf.txt"), 45 ),
                (LoadResource("TextInPdf_Coronavirus 23.03.pdf.txt"), 45 ),
            }.Select(t => new object[] { t.pdfText, t.number });
        }

        private static string LoadResource(string resource)
        {
            if (_resourceDictionary.ContainsKey(resource))
            {
                return _resourceDictionary[resource];
            }

            var assembly = typeof(PdfParserShould).GetTypeInfo().Assembly;
            var resourceKey = $"Code4Ro.CoViz19.Parser.UnitTests.PdfTexts.{resource}";
            var aa  = assembly.GetManifestResourceNames();
            using (var stream = assembly.GetManifestResourceStream(resourceKey))
            {
                using (var sr = new StreamReader(stream))
                {
                    var content = sr.ReadToEnd();
                    _resourceDictionary.Add(resource, content);

                    return sr.ReadToEnd();
                }
            }
        }
    }


}
