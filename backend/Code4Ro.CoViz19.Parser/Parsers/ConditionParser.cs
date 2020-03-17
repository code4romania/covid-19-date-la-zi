using System;
using System.Collections.Generic;
using Code4Ro.CoViz19.Models;

namespace Code4Ro.CoViz19.Parser.Parsers
{
    public class ConditionParser
    {
        private static Dictionary<string, PatientCondition> conditionKeyMapping =
            new Dictionary<string, PatientCondition>
            {
                { "carantină", PatientCondition.Quarantined },
                { "carantina", PatientCondition.Quarantined },
                { "stare gravă", PatientCondition.ICU },
                { "stare grava", PatientCondition.ICU }
            };

        public static PatientCondition Parse(bool isCured, string hospitalizationLocation)
        {
            if (isCured)
            {
                return PatientCondition.Cured;
            }

            if(string.IsNullOrWhiteSpace(hospitalizationLocation))
            {
                return PatientCondition.Unknown;
            }

            foreach (var mapping in conditionKeyMapping)
            {
                if (hospitalizationLocation.Contains(mapping.Key))
                {
                    return mapping.Value;
                }
            }

            if(hospitalizationLocation.Trim().Length != 0)
            {
                return PatientCondition.Hospitalised;
            }
            return PatientCondition.Unknown;
        }
    }
}
