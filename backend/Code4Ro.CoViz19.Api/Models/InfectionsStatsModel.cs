using Newtonsoft.Json;
using System;

namespace Code4Ro.CoViz19.Api.Models
{
    public class InfectionsStatsModel
    {
        public DateTime? DatePublished { get; set; }
        public string DatePublishedString { get; set; }
        [JsonProperty(PropertyName = "date")] public long Date { get; set; }
        [JsonProperty(PropertyName = "date_string")] public string DateString { get; set; }
        [JsonProperty(PropertyName = "confirmed")] public int Confirmed { get; set; }
        [JsonProperty(PropertyName = "monitored")] public int Monitored { get; set; }
        [JsonProperty(PropertyName = "hospitalized")] public int Hospitalized { get; set; }
        [JsonProperty(PropertyName = "cured")] public int Cured { get; set; }
        [JsonProperty(PropertyName = "in_icu")] public int InIcu { get; set; }
        [JsonProperty(PropertyName = "in_quarantine")] public int InQuarantine { get; set; }
        [JsonProperty(PropertyName = "deaths")] public int Deaths { get; set; }
    }

}
