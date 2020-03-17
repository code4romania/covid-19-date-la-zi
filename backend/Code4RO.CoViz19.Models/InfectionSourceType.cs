using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace Code4Ro.CoViz19.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum InfectionSourceType
    {
        [EnumMember(Value = "unknown")]
        Unknown = 1,
        [EnumMember(Value = "intern")]
        Intern = 2,
        [EnumMember(Value = "extern")]
        Extern = 3
    }
}