using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class DailyStatsV2Model
    {
        [JsonProperty(PropertyName = "last_updated_on")] public long DataLastUpdatedOn { get; set; }
        [JsonProperty(PropertyName = "last_updated_on_string")] public string DataLastUpdatedOnString { get; set; }
        public DailyStats CurrentDay { get; set; }
        public DailyStats[] History { get; set; }
    }

    public class DailyStats
    {
        public long DatePublished { get; set; }
        public string DatePublishedString { get; set; }
        public int Infected { get; set; }
        public int Cured { get; set; }
        public int Deaths { get; set; }
        public string AverageAge { get; set; }
        public bool Complete { get; set; }
    }
}
