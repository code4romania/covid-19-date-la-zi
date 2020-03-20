using Code4Ro.CoViz19.Api.Mappers;
using Shouldly;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Code4Ro.CoViz19.Api.Tests
{
    public class CountiesNameMapperShould
    {
        [Theory]
        [MemberData(nameof(RegularData))]
        [MemberData(nameof(RegularDataLowerCase))]
        [MemberData(nameof(CountiesNoDiacritics))]
        [MemberData(nameof(CountiesNoDiacriticsLowercase))]
        [MemberData(nameof(MisspelledCounties))]
        [MemberData(nameof(MisspelledCountiesLowercase))]

        public void MapCountyCorrectly(string text, string expectedMap)
        {
            CountiesNameMapper.MapToRomanianName(text).ShouldBe(expectedMap);
        }

        public static IEnumerable<object[]> RegularData()
        {
            return _defaultMap.Select(t => new object[] { t.sourceText, t.county });
        }

        public static IEnumerable<object[]> RegularDataLowerCase()
        {
            return _defaultMap.Select(t => new object[] { t.sourceText.ToLower(), t.county });
        }

        public static IEnumerable<object[]> CountiesNoDiacritics()
        {
            return _countiesNoDiacritics.Select(t => new object[] { t.sourceText, t.county });
        }

        public static IEnumerable<object[]> CountiesNoDiacriticsLowercase()
        {

            return _countiesNoDiacritics.Select(t => new object[] { t.sourceText.ToLower(), t.county });
        }

        public static IEnumerable<object[]> MisspelledCounties()
        {
            return _missSpelledCounties.Select(t => new object[] { t.sourceText, t.county });
        }

        public static IEnumerable<object[]> MisspelledCountiesLowercase()
        {
            return _missSpelledCounties.Select(t => new object[] { t.sourceText, t.county });
        }


        private static readonly (string sourceText, string county)[] _countiesNoDiacritics = new (string sourceText, string county)[] {
                    (   "Alba", "Alba"    ),
                    (   "Arad","Arad"    ),
                    (   "Arges","Argeș"   ),
                    (   "Bacau","Bacău"   ),
                    (   "Bihor","Bihor"   ),
                    (   "Bistrita-Nasaud","Bistrița-Năsăud"    ),
                    (   "Botosani","Botoșani" ),
                    (   "Brasov","Brașov" ),
                    (   "Braila","Brăila" ),
                    (   "Bucuresti","București"   ),
                    (   "Buzau","Buzău"   ),
                    (   "Caras-Severin","Caraș-Severin"    ),
                    (   "Calarasi","Călărași" ),
                    (   "Cluj","Cluj" ),
                    (   "Constanta","Constanța"   ),
                    (   "Covasna","Covasna"   ),
                    (   "Dambovita","Dâmbovița"   ),
                    (   "Dolj","Dolj" ),
                    (   "Galati","Galați" ),
                    (   "Giurgiu","Giurgiu"   ),
                    (   "Gorj","Gorj" ),
                    (   "Harghita","Harghita" ),
                    (   "Hunedoara","Hunedoara"   ),
                    (   "Ialomita","Ialomița" ),
                    (   "Iasi","Iași" ),
                    (   "Ilfov","Ilfov"   ),
                    (   "Maramures","Maramureș"   ),
                    (   "Mehedinti","Mehedinți"   ),
                    (   "Mures","Mureș"   ),
                    (   "Neamt","Neamț"   ),
                    (   "Olt","Olt"   ),
                    (   "Prahova","Prahova"   ),
                    (   "Satu Mare","Satu Mare"    ),
                    (   "Salaj","Sălaj"   ),
                    (   "Sibiu","Sibiu"   ),
                    (   "Suceava","Suceava"   ),
                    (   "Teleorman","Teleorman"   ),
                    (   "Timis","Timiș"   ),
                    (   "Timisoara","Timiș"   ),
                    (   "Tulcea","Tulcea" ),
                    (   "Vaslui","Vaslui" ),
                    (   "Valcea","Vâlcea" ),
                    (   "Vrancea","Vrancea"   )
                };

        private readonly static (string sourceText, string county)[] _missSpelledCounties = new (string sourceText, string county)[] {
                    (   "Bistrița-Năsăud","Bistrița-Năsăud"    ),
                    (   "Bistrița Năsăud","Bistrița-Năsăud"    ),
                    (   "Caraș-Severin","Caraș-Severin"    ),
                    (   "Caraș Severin","Caraș-Severin"    ),
                    (   "Timiș","Timiș"   ),
                    (   "Timișoara","Timiș"   ),
                    (   "Bistrita-Nasaud","Bistrița-Năsăud"    ),
                    (   "Bistrita Nasaud","Bistrița-Năsăud"    ),
                    (   "Caras-Severin","Caraș-Severin"    ),
                    (   "Caras Severin","Caraș-Severin"    ),
                    (   "Timis","Timiș"   ),
                    (   "Timisoara","Timiș"   )
                };

        private readonly static (string sourceText, string county)[] _defaultMap = new (string sourceText, string county)[] {
                ("", ""),
                (   "Alba", "Alba"    ),
                (   "Arad","Arad"    ),
                (   "Argeș","Argeș"   ),
                (   "Bacău","Bacău"   ),
                (   "Bihor","Bihor"   ),
                (   "Bistrița-Năsăud","Bistrița-Năsăud"    ),
                (   "Botoșani","Botoșani" ),
                (   "Brașov","Brașov" ),
                (   "Brăila", "Brăila" ),
                (   "București","București"   ),
                (   "Buzău","Buzău"),
                (   "Caraș-Severin","Caraș-Severin"    ),
                (   "Călărași","Călărași" ),
                (   "Cluj","Cluj" ),
                (   "Constanța","Constanța"   ),
                (   "Covasna","Covasna"   ),
                (   "Dâmbovița","Dâmbovița"   ),
                (   "Dolj","Dolj" ),
                (   "Galați","Galați" ),
                (   "Giurgiu","Giurgiu"   ),
                (   "Gorj","Gorj" ),
                (   "Harghita","Harghita" ),
                (   "Hunedoara","Hunedoara"   ),
                (   "Ialomița","Ialomița" ),
                (   "Iași","Iași" ),
                (   "Ilfov","Ilfov"   ),
                (   "Maramureș","Maramureș"   ),
                (   "Mehedinți","Mehedinți"   ),
                (   "Mureș","Mureș"   ),
                (   "Neamț","Neamț"   ),
                (   "Olt","Olt"   ),
                (   "Prahova","Prahova"   ),
                (   "Satu Mare","Satu Mare"    ),
                (   "Sălaj","Sălaj"   ),
                (   "Sibiu","Sibiu"   ),
                (   "Suceava","Suceava"   ),
                (   "Teleorman","Teleorman"   ),
                (   "Timiș","Timiș"   ),
                (   "Tulcea","Tulcea" ),
                (   "Vaslui","Vaslui" ),
                (   "Vâlcea","Vâlcea" ),
                (   "Vrancea","Vrancea"   )
            };
    }
}
