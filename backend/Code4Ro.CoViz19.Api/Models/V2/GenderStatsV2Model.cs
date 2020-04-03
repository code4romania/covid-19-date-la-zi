using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class GenderStatsV2Model
    {
        public long DatePublished { get; set; }
        public string DatePublishedString { get; set; }
        [JsonProperty(PropertyName = "last_updated_on")] public long DataLastUpdatedOn { get; set; }
        [JsonProperty(PropertyName = "last_updated_on_string")] public string DataLastUpdatedOnString { get; set; }
        public decimal PercentageOfMen { get; set; }
        public decimal PercentageOfWomen { get; set; }
        public decimal PercentageOfChildren { get; set; }
        public decimal TotalPercentage { get; set; }
        public int TotalNumber { get; set; }
        [JsonProperty(PropertyName = "stale")] public bool Stale { get; set; }
    }
}
