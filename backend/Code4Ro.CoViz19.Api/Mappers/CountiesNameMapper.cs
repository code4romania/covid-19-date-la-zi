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
            { "Argeș", ""},
            {"Bacău","Bacău"},
            {"Bistrița-Năsăud","Bistrița-Năsăud"},
            {"Bistrița Năsăud","Bistrița-Năsăud"},
            {"Botoșani","Botoșani"},
            {"Brașov","Brașov"},
            {"Brăila","Brăila"},
            {"București","București"},
            {"Buzău","Buzău"},
            {"Caraș-Severin","Caraș-Severin"},
            {"Caraș Severin","Caraș-Severin"},
            {"Călărași","Călărași"},
            {"Constanța","Constanța"},
            {"Dâmbovița","Dâmbovița"},
            {"Galați","Galați"},
            {"Ialomița","Ialomița"},
            {"Iași","Iași"},
            {"Maramureș","Maramureș"},
            {"Mehedinți","Mehedinți"},
            {"Mureș","Mureș"},
            {"Neamț","Neamț"},
            {"Sălaj","Sălaj"},
            {"Timișoara","Timiș"},
            {"Timiș","Timiș"},
            {"Vâlcea","Vâlcea"}
        };
        public static string MapToRomanianName(string countyName)
        {
            countyName = countyName?.Trim();
            if (string.IsNullOrEmpty(countyName))
            {
                return countyName;
            }

            string mappedName = Counties.FirstOrDefault(x => Normalize(x.Key).Equals(countyName, StringComparison.InvariantCultureIgnoreCase)).Value;
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
