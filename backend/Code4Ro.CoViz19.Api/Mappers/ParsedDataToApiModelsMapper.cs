﻿using Code4Ro.CoViz19.Api.Models;
using Code4Ro.CoViz19.Models;
using System;
using System.Linq;

namespace Code4Ro.CoViz19.Api.Mappers
{
    public class ParsedDataToApiModelsMapper
    {

        public static InfectionsStatsModel MapToInfectionsStatsModel(LiveUpdateData liveData, ParsedDataModel parsedData)
        {
            if (liveData == null)
            {
                return new InfectionsStatsModel();
            }

            var data = new InfectionsStatsModel()
            {
                Confirmed = liveData.NumberDiagnosed ?? 0,
                Cured = liveData.NumberCured ?? 0,
                Hospitalized = parsedData.PatientsInfo.Count(p => p.Condition == PatientCondition.Hospitalised),
                InQuarantine = liveData.NumberQuarantined ?? 0,
                Monitored = liveData.NumberMonitoredAtHome ?? 0,
                Deaths = parsedData.PatientsInfo.Count(p=>p.Condition == PatientCondition.Deceased),
                InIcu = parsedData.PatientsInfo.Count(p => p.Condition == PatientCondition.ICU),
                Date = new DateTimeOffset(liveData.Timestamp).ToUnixTimeSeconds(),
                DateString = liveData.Timestamp.ToShortDateString()

            };

            return data;
        }
    }
}
