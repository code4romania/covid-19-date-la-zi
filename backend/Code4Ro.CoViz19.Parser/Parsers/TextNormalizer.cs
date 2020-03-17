using System.Text;

namespace Code4Ro.CoViz19.Parser.Parsers
{
    public class TextNormalizer
    {
        public static string Normalize(string text)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance); // needs to be run once at the start of the program
            var lowerCaseText = text.ToLowerInvariant();
            var tempBytes = System.Text.Encoding.GetEncoding("iso-8859-8").GetBytes(lowerCaseText);
            return System.Text.Encoding.ASCII.GetString(tempBytes);
        }
    }
}