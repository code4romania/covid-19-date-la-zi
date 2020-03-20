using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Models
{
    public class GenderStatsModel
    {
        public Stats Stats { get; set; }
    }

    public class Stats
    {
        [JsonProperty(PropertyName = "date")] public long Date { get; set; }
        [JsonProperty(PropertyName = "date_string")] public string DateString { get; set; }
        [JsonProperty(PropertyName = "women")] public int Women { get; set; }
        [JsonProperty(PropertyName = "men")] public int Men { get; set; }
        [JsonProperty(PropertyName = "total")] public int Total { get; set; }
    }
}
