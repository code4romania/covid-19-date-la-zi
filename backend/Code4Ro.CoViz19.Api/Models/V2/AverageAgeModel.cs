namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class AverageAgeModel
    {
        public string Value { get; set; }
        public long LastUpdated { get; set; }
        public string LastUpdatedString { get; set; }
        public bool Stale { get; set; }
    }
}
