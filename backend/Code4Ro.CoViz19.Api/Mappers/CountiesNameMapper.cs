using System;
using System.Globalization;
using System.Linq;
using System.Text;

namespace Code4Ro.CoViz19.Api.Mappers
{
    public class CountiesNameMapper
    {
        private static readonly string[] Counties =
        {
            "Argeș",
            "Bacău",
            "Bistrița-Năsăud",
            "Bistrița Năsăud",
            "Botoșani",
            "Brașov",
            "Brăila",
            "București",
            "Buzău",
            "Caraș-Severin",
            "Caraș Severin",
            "Călărași",
            "Constanța",
            "Dâmbovița",
            "Galați",
            "Ialomița",
            "Iași",
            "Maramureș",
            "Mehedinți",
            "Mureș",
            "Neamț",
            "Sălaj",
            "Timișoara",
            "Timiș",
            "Vâlcea",
        };
        public static string MapToRomanianName(string countyName)
        {
            countyName = countyName?.Trim();
            if (string.IsNullOrEmpty(countyName))
            {
                return countyName;
            }

            string mappedName = Counties.FirstOrDefault(x => Normalize(x).Equals(countyName, StringComparison.InvariantCultureIgnoreCase));
            return mappedName ?? countyName;
        }

        static string Normalize(string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }
    }
}
