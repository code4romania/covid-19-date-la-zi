using System.Collections.Generic;

namespace Code4Ro.CoViz19.Models.ParsedPdfModels
{
    public class DailyPdfStats
    {
        public long ParsedOn { get; set; }
        public string ParsedOnString { get; set; }
        public string FileName { get; set; }

        public string AgerageAge { get; set; }
        public int NumberInfected { get; set; }
        public int NumberCured { get; set; }
        public int NumberDeceased { get; set; }
        public int NumberOfWomen { get; set; }
        public int NumberOfMen { get; set; }
        public int NumberOfChildren { get; set; }
        public Dictionary<AgeRange, int> DistributionByAge { get; set; }
    }
}
