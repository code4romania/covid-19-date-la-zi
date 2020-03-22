using System;

namespace Code4Ro.CoViz19.Models
{
    public class ParsedDataModel
    {
        public DateTime? DatePublished { get; set; }
        public string DatePublishedString { get; set; }
        public LiveUpdateData[] LiveUpdateData { get; set; }
        public PatientInfo[] PatientsInfo { get; set; }
        public CountyInfectionsInfo[] CountiesData { get; set; }
    }
}
