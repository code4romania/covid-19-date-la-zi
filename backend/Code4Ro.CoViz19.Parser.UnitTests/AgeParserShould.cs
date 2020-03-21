using Code4Ro.CoViz19.Parser.Parsers;
using Shouldly;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Code4Ro.CoViz19.Parser.UnitTests
{
    public class AgeParserShould
    {
        [Theory]
        [MemberData(nameof(Data))]
        public void Parse_age_correctly(string text, int? expectedMap)
        {
            AgeParser.Parse(text).ShouldBe(expectedMap);
        }

        public static IEnumerable<object[]> Data()
        {
            return new (string sourceText, int? age)[] {
                ("25 de ani", 25 ),
                ("45 de ani", 45 ),
                ("38 de ani", 38 ),
                (" 47 de ani", 47 ),
                ("16 ani", 16 ),
                ("71 de ani", 71 ),
                ("51 de ani", 51 ),
                ("40 de ani", 40 ),
                ("15 ani", 15 ),
                (" 49 de ani", 49 ),
                ("72 de ani", 72 ),
                ("42 de ani", 42 ),
                ("70 de ani", 70 ),
                ("73 de ani", 73 ),
                ("60 de ani", 60 ),
                ("31 de ani", 31 ),
                ("32 de ani", 32 ),
                (" 30 de ani,gravidă",30 ),
                ("3 ani", 3 ),
                ("36 de ani", 36 ),
                ("35 de ani", 35 ),
                (" 34 de ani", 34 ),
                ("41 de ani", 41 ),
                (" 37 de ani", 37 ),
                ("26 de ani", 26 ),
                (" 57 de ani", 57 ),
                ("43 de ani", 43 ),
                (" 55 de ani", 55 ),
                ("53 de ani", 53 ),
                ("56 de ani", 56 ),
                ("63 de ani", 63 ),
                (" 48 de ani", 48 ),
                (" 21 de ani", 21 ),
                ("33 de ani", 33 ),
                ("58 de ani", 58 ),
                ("74 de ani", 74 ),
                ("39 ani", 39 ),
                ("40 ani", 40 ),  
                ("1 an", 1 ),
                ("27 ani", 27 ),
                ("55 ani", 55 ),
                ("47 ani", 47 ),
                ("54 ani", 54 ),
                ("19 ani", 19 ),
                ("4 ani", 4 ),
                ("43 ani", 43 ),
                ("31 ani", 31 ),
   
                ("46",  46),
                ("31",  31),
                ("70",  70),
                ("77",  77),
                ("62",  62),
                ("89",  89),
                ("61",  61),
                ("39",  39),
                ("35 ",  35),
                ("40 ",  40),
                ("52 ",  52),
                ("23 ",  23),
                ("22 ",  22),
                (" 47",  47),
                (" 43",  43),
                (" 72",  72),
                (" 74",  74),
                (" 33",  33),
                (" 38 ",  38),
                (" 36 ",  36),
                ("", null),
                (null, null),
                ("nu e frumos sa intrebi un programator ce varsta are", null),


            }.Select(t => new object[] { t.sourceText, t.age });
        }
    }
}
