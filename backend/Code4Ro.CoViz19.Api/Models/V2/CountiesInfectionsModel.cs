using System.Collections.Generic;
using Code4Ro.CoViz19.Models.ParsedPdfModels;

namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class CountiesInfectionsModel
    {
        public CountyInfectionModel[] Data { get; set; }
        public string LastUpdatedString { get; set; }
        public long LastUpdated { get; set; }
        public bool Stale { get; set; }
    }

    public class CountyInfectionModel
    {
        public County County { get; set; }
        public int NumberInfected { get; set; }
        public int TotalPopulation { get; set; }
        public decimal Infectionpercentage { get; set; }
    }
}
