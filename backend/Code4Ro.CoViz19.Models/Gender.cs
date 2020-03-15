using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;


namespace Code4Ro.CoViz19.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Gender
    {
        [EnumMember(Value = "man")]
        Man,
        [EnumMember(Value = "woman")]
        Woman
    }
}