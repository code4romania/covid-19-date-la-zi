using System;

namespace Code4Ro.CoViz19.Api.Models
{
    public class CountyInfectionsModel
    {
        public long Date { get; set; }
        public string DateString { get; set; }
        public int Total { get; set; }
        public CountyDataModel[] Counties { get; set; }
    }

    public class CountyDataModel
    {
        public string Name { get; set; }
        public int Count { get; set; }
    }
}