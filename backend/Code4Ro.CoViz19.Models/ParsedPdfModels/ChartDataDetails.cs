using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Models.ParsedPdfModels
{
    public class ChartDataDetails
    {
        [JsonProperty(PropertyName = "contains")] public string[] Contains { get; set; }
        [JsonProperty(PropertyName = "lastUpdatedOn")] public string LastUpdatedOn { get; set; }
        [JsonProperty(PropertyName = "stale")] public bool Stale { get; set; }
    }
}