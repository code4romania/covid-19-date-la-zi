using System;

namespace Code4Ro.CoViz19.Api.Models
{
    public class DailyStatsModel
    {
        public DateTime? DatePublished { get; set; }
        public string DatePublishedString { get; set; }
        public InfectionsStatsModel[] History { get; set; }
    }

}
