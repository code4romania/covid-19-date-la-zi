using System.Collections.Generic;
using Code4Ro.CoViz19.Models.ParsedPdfModels;
using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class GenderAgeHistogramV2Model
    {
        public long DatePublished { get; set; }
        public string DatePublishedString { get; set; }
        [JsonProperty(PropertyName = "histogram")] public Dictionary<AgeRange, int> Histogram { get; set; }
        [JsonProperty(PropertyName = "total")] public int Total { get; set; }

    }
}
