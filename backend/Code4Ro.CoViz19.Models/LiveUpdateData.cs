using System;

namespace Code4Ro.CoViz19.Models
{
    public class LiveUpdateData
    {
        public DateTime Timestamp { get; set; }
        public int? NumberDiagnosed { get; set; }
        public int? NumberCured { get; set; }
        public int? NumberQuarantined { get; set; }
        public int? NumberMonitoredAtHome { get; set; }
        public int? EmergencyCalls { get; set; }
        public int? HotLineCalls { get; set; }
        public int? NumberCriminalCases { get; set; }
        public int? ProbesAnalyzed { get; set; }
        public int? ProbesInAnalysis { get; set; }
    }
}