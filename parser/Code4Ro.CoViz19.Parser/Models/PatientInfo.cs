namespace Code4Ro.CoViz19.Parser.Models
{
    public class PatientInfo
    {
        public int PatientNumber { get; set; }
        public Gender Gender { get; set; }
        public int? Age { get; set; }
        public string Domicile { get; set; }
        public string InfectionContact { get; set; }
        public string HospitalizationLocation { get; set; }
        public string HealthState { get; set; }
        public bool IsCured { get; internal set; }
    }
}
