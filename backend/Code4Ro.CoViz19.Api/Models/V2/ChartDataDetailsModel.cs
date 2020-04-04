using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class ChartDataDetailsModel
    {
        [JsonProperty(PropertyName = "contains")] public string[] Contains { get; set; }
        [JsonProperty(PropertyName = "lastUpdatedOn")] public string LastUpdatedOn { get; set; }
        [JsonProperty(PropertyName = "stale")] public bool Stale { get; set; }
    }
}