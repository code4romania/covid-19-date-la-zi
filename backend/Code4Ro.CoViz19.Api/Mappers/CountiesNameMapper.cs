using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace Code4Ro.CoViz19.Api.Mappers
{
    public class CountiesNameMapper
    {
        private static readonly Dictionary<string, string> Counties = new Dictionary<string, string>
        {
                { "Alba", "Alba"  },
                { "Arad","Arad"  },
                { "Argeș","Argeș" },
                { "Bacău","Bacău" },
                { "Bihor","Bihor" },
                { "Botoșani","Botoșani" },
                { "Brașov","Brașov" },
                { "Brăila", "Brăila" },
                { "București","București" },
                { "Buzău","Buzău"},
                { "Călărași","Călărași" },
                { "Cluj","Cluj" },
                { "Constanța","Constanța" },
                { "Covasna","Covasna" },
                { "Dâmbovița","Dâmbovița" },
                { "Dolj","Dolj" },
                { "Galați","Galați" },
                { "Giurgiu","Giurgiu" },
                { "Gorj","Gorj" },
                { "Harghita","Harghita" },
                { "Hunedoara","Hunedoara" },
                { "Ialomița","Ialomița" },
                { "Iași","Iași" },
                { "Ilfov","Ilfov" },
                { "Maramureș","Maramureș" },
                { "Mehedinți","Mehedinți" },
                { "Mureș","Mureș" },
                { "Neamț","Neamț" },
                { "Olt","Olt" },
                { "Prahova","Prahova" },
                { "Satu Mare","Satu Mare"  },
                { "Sălaj","Sălaj" },
                { "Sibiu","Sibiu" },
                { "Suceava","Suceava" },
                { "Teleorman","Teleorman" },
                { "Tulcea","Tulcea" },
                { "Vaslui","Vaslui" },
                { "Vâlcea","Vâlcea" },
                { "Vrancea","Vrancea" },
                { "Caraș-Severin","Caraș-Severin" },
                { "Caraș Severin","Caraș-Severin" },
                { "Bistrița-Năsăud","Bistrița-Năsăud" },
                { "Bistrița Năsăud","Bistrița-Năsăud" },
                { "Timișoara","Timiș"},
                { "Timiș","Timiș"},
        };

        public static string MapToRomanianName(string countyName)
        {
            countyName = countyName?.Trim();
            if (string.IsNullOrEmpty(countyName))
            {
                return countyName;
            }

            string mappedName = Counties.FirstOrDefault(x => Normalize(x.Key).Equals(Normalize(countyName), StringComparison.InvariantCultureIgnoreCase)).Value;
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
