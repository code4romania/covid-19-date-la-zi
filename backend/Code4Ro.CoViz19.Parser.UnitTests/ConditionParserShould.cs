using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Parser.Parsers;
using Shouldly;
using Xunit;

namespace Code4Ro.CoViz19.Parser.UnitTests
{
    public class ConditionParserShould
    {
        [Theory]
        [InlineData("")]
        [InlineData("Vbabses")]
        [InlineData("Timișoara")]
        [InlineData(null)]
        public void ReturnCured_WhenPatientIsCured(string hospitalizationLocation)
        {
            var actual = ConditionParser.Parse(true, hospitalizationLocation);

            actual.ShouldBe(PatientCondition.Cured);
        }

        [Theory]
        [InlineData("")]
        [InlineData("  ")]
        [InlineData(null)]
        public void ReturnUnknown_WhenThereIsNoHospitalizationLocationAndPatientIsNotCured(string hospitalizationLocation)
        {
            var actual = ConditionParser.Parse(false, hospitalizationLocation);

            actual.ShouldBe(PatientCondition.Unknown);
        }

        [Theory]
        [InlineData("carantina")]
        [InlineData("carantină")]
        public void ReturnQuarantined_WhenThereHospitalizationLocationContainsQuarantine(string hospitalizationLocation)
        {
            var actual = ConditionParser.Parse(false, hospitalizationLocation);

            actual.ShouldBe(PatientCondition.Quarantined);
        }

        [Theory]
        [InlineData("stare gravă ATI")]
        [InlineData("stare grava")]
        public void ReturnICU_WhenThereHospitalizationLocationContainsStateInfo(string hospitalizationLocation)
        {
            var actual = ConditionParser.Parse(false, hospitalizationLocation);

            actual.ShouldBe(PatientCondition.ICU);
        }

        [Theory]
        [InlineData("București - primul caz")]
        [InlineData("polițist de frontieră")]
        [InlineData("boli infecțioase Timișoara")]
        public void ReturnHospitalised_WhenThereHospitalizationLocationNonEmpty(string hospitalizationLocation)
        {
            var actual = ConditionParser.Parse(false, hospitalizationLocation);

            actual.ShouldBe(PatientCondition.Hospitalised);
        }
    }
}
