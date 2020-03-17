using Code4Ro.CoViz19.Models;
using System;

namespace Code4Ro.CoViz19.Parser.Parsers
{
    public class GenderParser
    {
        public static Gender Parse(string genderInfo)
        {
            if (string.IsNullOrEmpty(genderInfo))
            {
                return Gender.Unknown;
            }

            string gender = TextNormalizer.Normalize(genderInfo).ToLower().Trim();

            if (gender.StartsWith("f", StringComparison.InvariantCultureIgnoreCase))
            {
                return Gender.Woman;
            }

            if (gender.StartsWith("b", StringComparison.InvariantCultureIgnoreCase))
            {
                return Gender.Man;
            }

            return Gender.Unknown;
        }
    }
}
