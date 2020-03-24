namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class GenderStatsV2Model
    {
        public long DatePublished { get; set; }
        public string DatePublishedString { get; set; }
        public int Men { get; set; }
        public int Women { get; set; }
        public int Children { get; set; }
        public int Total { get; set; }
    }
}
