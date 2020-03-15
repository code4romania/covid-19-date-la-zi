using Code4Ro.CoViz19.Api.Models;
using Code4Ro.CoViz19.Models;
using System;
using System.Linq;

namespace Code4Ro.CoViz19.Api.Mappers
{
    public class ParsedDataToApiModelsMapper
    {

        public static InfectionsStatsModel MapToInfectionsStatsModel(LiveUpdateData liveData, PatientInfo[] patiensInfo)
        {
            if (liveData == null)
            {
                return new InfectionsStatsModel();
            }

            var data = new InfectionsStatsModel()
            {
                Confirmed = liveData.NumberDiagnosed ?? 0,
                Cured = liveData.NumberCured ?? 0,
                Hospitalized = patiensInfo?.Count(x => !string.IsNullOrEmpty(x.HospitalizationLocation)) ?? 0,
                InQuarantine = liveData.NumberQuarantined ?? 0,
                Monitored = liveData.NumberMonitoredAtHome ?? 0,
                InIcu = 0,
                Date = new DateTimeOffset(liveData.Timestamp).ToUnixTimeSeconds()

            };

            return data;
        }
    }
}
