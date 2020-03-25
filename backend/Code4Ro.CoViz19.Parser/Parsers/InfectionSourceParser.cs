using Code4Ro.CoViz19.Models;
using static Code4Ro.CoViz19.Models.InfectionSourceType;

namespace Code4Ro.CoViz19.Parser.Parsers
{
    public class InfectionSourceParser
    {

        private static (string keyword, InfectionSourceType type)[] keywords =
        {
            ("fara contact", Unknown),
            ("contact", Intern),
            ("calatorit", Extern),
            ("pacient", Intern),
            ("spital", Intern),
            ("caz", Intern),
            ("sosit", Extern),
            ("venit", Extern),
            ("intrat", Extern),
            ("intors", Extern),
            ("intoarsa", Extern),
            ("lucreaza", Extern) // this is fishy... I expect it to break
        };
        public static InfectionSourceType Parse(string text)
        {
            var normalizedText = TextNormalizer.Normalize(text);
            foreach ((string keyword, InfectionSourceType type) in keywords)
            {
                if (normalizedText.Contains(keyword))
                    return type;
            }
            return Unknown;
        }
    }
}