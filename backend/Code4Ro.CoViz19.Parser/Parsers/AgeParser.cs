using System;

namespace Code4Ro.CoViz19.Parser.Parsers
{
    public static class AgeParser
    {
        public static int? Parse(string value)
        {
            string ageInfo = TextNormalizer.Normalize(value);
            int? age = null;
            if (string.IsNullOrEmpty(ageInfo))
            {
                return age;
            }
            ageInfo
                .Replace("de ani", string.Empty, StringComparison.InvariantCultureIgnoreCase)
                .Replace("ani", string.Empty, StringComparison.InvariantCultureIgnoreCase);

            if (ageInfo.Length == 2)
            {
                if (int.TryParse(ageInfo, out _) == false)
                {
                    return age;
                }

                return int.Parse(ageInfo);
            }

            string ageValue = ageInfo.Substring(0, 2).Trim();
            if (int.TryParse(ageValue, out _) == false)
            {
                return null;
            }

            return int.Parse(ageValue);


        }
    }
}
