using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;
// ReSharper disable InconsistentNaming

namespace Code4Ro.CoViz19.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum PatientCondition
    {
        [EnumMember(Value = "unknown")]
        Unknown = 0,

        [EnumMember(Value = "quarantined")]
        Quarantined,

        [EnumMember(Value = "icu")]
        ICU,

        [EnumMember(Value = "hospitalised")]
        Hospitalised,

        [EnumMember(Value = "cured")]
        Cured,

        [EnumMember(Value = "deceased")]
        Deceased
    }
}
