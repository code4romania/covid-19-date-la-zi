namespace Code4Ro.CoViz19.Parser.Models
{
    public class ParsedDataModel
    {
        public LiveUpdateData[] LiveUpdateData { get; set; }
        public PatientInfo[] PatientsInfo { get; set; }
        public CountyInfectionsInfo[] CountiesData { get; set; }
    }
}
