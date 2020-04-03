using System.Collections.Generic;
using Code4Ro.CoViz19.Models.ParsedPdfModels;

namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class CountiesInfectionsModel
    {
        public Dictionary<County, int> Data { get; set; }
        public string LastUpdatedString { get; set; }
        public long LastUpdated { get; set; }
        public bool Stale { get; set; }
    }
}
