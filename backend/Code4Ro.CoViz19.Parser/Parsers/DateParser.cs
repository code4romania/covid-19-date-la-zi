using System;


namespace Code4Ro.CoViz19.Parser.Parsers
{
    public static class DateParser
    {
        public static DateTime? Parse(string date)
        {
            if (DateTime.TryParse(date, out var result))
            {
                return result;
            }

            return null;
        }
    }
}
