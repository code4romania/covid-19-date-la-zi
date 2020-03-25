using System;
using System.Globalization;
using System.Text.RegularExpressions;

namespace Code4Ro.CoViz19.Parser.Parsers
{
    public class FilenameDateParser
    {
        public static DateTime Parse(string filename)
        {
            CultureInfo provider = CultureInfo.InvariantCulture;

            Regex dateFormat1 = new Regex(@"\d{2}\.\d{2}\.\d{4}", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            Regex dateFormat2 = new Regex(@"\d{2}-\d{2}-\d{4}", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            // Find matches.
            MatchCollection matches = dateFormat1.Matches(filename);
            if(matches.Count > 0)
            {
                return DateTime.ParseExact(matches[0].Value, "dd.MM.yyyy", provider);
            }

            matches = dateFormat2.Matches(filename);
            if (matches.Count > 0)
            {
                return DateTime.ParseExact(matches[0].Value, "dd-MM-yyyy", provider);
            }
            return DateTime.Today;
        }
    }
}
