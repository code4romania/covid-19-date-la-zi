namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class GenderStatsV2Model
    {
        public long DatePublished { get; set; }
        public string DatePublishedString { get; set; }
        public decimal Men { get; set; }
        public decimal Women { get; set; }
        public decimal Children { get; set; }
        public int Total { get; set; }
    }
}
