using Code4Ro.CoViz19.Parser.Parsers;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Code4Ro.CoViz19.Parser.UnitTests
{
    public class FilenameDateParserShould
    {
        [Theory]
        [MemberData(nameof(Data))]
        public void ReturnQuarantined_WhenThereHospitalizationLocationContainsQuarantine(string hospitalizationLocation,DateTime expected)
        {
            var actual = FilenameDateParser.Parse( hospitalizationLocation);

            actual.ShouldBe(expected);
        }

        public static IEnumerable<object[]> Data()
        {
            return new (string sourceText, DateTime date)[] {
                ("Cazuri confirmate COVID-19 20.03.2020 ora 18_00", new DateTime(2020,03,20)),
                ("Cazuri confirmate COVID-19 02.03.2020 ora 18_00", new DateTime(2020,03,2)),
                ("Cazuri confirmate COVID-19 20-03-2020 ora 18_00", new DateTime(2020,03,20)),
                ("Cazuri confirmate COVID-19 02-03-2020 ora 18_00", new DateTime(2020,03,2)),
                ("a călătorit în Italia", DateTime.Today),
               
            }.Select(t => new object[] { t.sourceText, t.date });
        }
    }
}
