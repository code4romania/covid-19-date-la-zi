using System.Collections.Generic;

namespace Code4Ro.CoViz19.Models.ParsedPdfModels
{
    public class DailyPdfStats
    {
        public bool Complete { get; set; }
        public long ParsedOn { get; set; }
        public string ParsedOnString { get; set; }
        public string FileName { get; set; }

        public string AverageAge { get; set; }
        public int NumberInfected { get; set; }
        public int NumberCured { get; set; }
        public int NumberDeceased { get; set; }
        public decimal PercentageOfWomen { get; set; }
        public decimal PercentageOfMen { get; set; }
        public decimal PercentageOfChildren { get; set; }
        public Dictionary<AgeRange, int> DistributionByAge { get; set; }
        public Dictionary<County, int> CountyInfectionsNumbers { get; set; }

        public DailyPdfStats()
        {
            DistributionByAge = new Dictionary<AgeRange, int>();
            CountyInfectionsNumbers = new Dictionary<County, int>();
        }
    }
}
