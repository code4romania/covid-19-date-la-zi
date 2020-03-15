namespace Code4Ro.CoViz19.Api.Models
{
    public class QuickStatsModel
    {
        public InfectionsStatsModel Totals { get; set; }
        public InfectionsStatsModel[] History { get; set; }
    }

}
