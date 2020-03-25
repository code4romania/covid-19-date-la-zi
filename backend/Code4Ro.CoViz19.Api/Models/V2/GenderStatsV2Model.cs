namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class GenderStatsV2Model
    {
        public long DatePublished { get; set; }
        public string DatePublishedString { get; set; }
        public decimal PercentageOfMen { get; set; }
        public decimal PercentageOfWomen { get; set; }
        public decimal PercentageOfChildren { get; set; }
        public decimal TotalPercentage { get; set; }
        public int TotalNumber { get; set; }
    }
}
