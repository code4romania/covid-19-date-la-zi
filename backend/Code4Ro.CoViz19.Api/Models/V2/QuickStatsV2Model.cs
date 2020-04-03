
using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class QuickStatsV2Model
    {
        [JsonProperty(PropertyName = "last_updated_on")] public long DataLastUpdatedOn { get; set; }
        [JsonProperty(PropertyName = "last_updated_on_string")] public string DataLastUpdatedOnString { get; set; }
        [JsonProperty(PropertyName = "date")] public long DatePublished { get; set; }
        [JsonProperty(PropertyName = "date_string")] public string DatePublishedString { get; set; }
        [JsonProperty(PropertyName = "totals")] public InfectionsStatsV2Model Totals { get; set; }
        [JsonProperty(PropertyName = "history")] public InfectionsStatsV2Model[] History { get; set; }
        [JsonProperty(PropertyName = "stale")] public bool Stale { get; set; }
    }

    public class InfectionsStatsV2Model
    {
        [JsonProperty(PropertyName = "date")] public long Date { get; set; }
        [JsonProperty(PropertyName = "date_string")] public string DateString { get; set; }
        [JsonProperty(PropertyName = "confirmed")] public int Confirmed { get; set; }
        [JsonProperty(PropertyName = "cured")] public int Cured { get; set; }
        [JsonProperty(PropertyName = "deaths")] public int Deaths { get; set; }
    }
}
