using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Parser.Parsers;
using Shouldly;
using Xunit;
using static Code4Ro.CoViz19.Models.Gender;

namespace Code4Ro.CoViz19.Parser.UnitTests
{
    public class GenderParserShould
    {
        [Theory]
        [InlineData("bărbat", Man)]
        [InlineData("bărbat ", Man)]
        [InlineData(" bărbat", Man)]
        [InlineData(" bărbat ", Man)]

        [InlineData("barbat", Man)]
        [InlineData("barbat ", Man)]
        [InlineData(" barbat", Man)]
        [InlineData(" barbat ", Man)]

        [InlineData("băiat", Man)]
        [InlineData("băiat ", Man)]
        [InlineData(" băiat", Man)]
        [InlineData(" băiat ", Man)]

        [InlineData("baiat", Man)]
        [InlineData(" baiat", Man)]
        [InlineData("baiat ", Man)]
        [InlineData(" baiat ", Man)]

        [InlineData("femeie", Woman)]
        [InlineData(" femeie", Woman)]
        [InlineData(" femeie ", Woman)]
        [InlineData("femeie ", Woman)]

        [InlineData("fată", Woman)]
        [InlineData("fată ", Woman)]
        [InlineData(" fată", Woman)]
        [InlineData(" fată ", Woman)]

        [InlineData("fata", Woman)]
        [InlineData("fata ", Woman)]
        [InlineData(" fata", Woman)]
        [InlineData(" fata ", Woman)]

        [InlineData("", Unknown)]
        [InlineData("did you just assumed my gender?", Unknown)]
        [InlineData("copil", Unknown)]
        public void MapToGenderCorrectly(string genderInfo, Gender expectedMap)
        {
            GenderParser.Parse(genderInfo).ShouldBe(expectedMap);
        }
    }
}
