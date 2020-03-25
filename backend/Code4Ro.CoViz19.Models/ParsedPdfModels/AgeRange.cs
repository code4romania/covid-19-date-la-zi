using System.Runtime.Serialization;

namespace Code4Ro.CoViz19.Models.ParsedPdfModels
{
    public enum AgeRange
    {
        [EnumMember(Value = "0-9")]
        Age09,
        [EnumMember(Value = "10-19")]
        Age1019,
        [EnumMember(Value = "20-29")]
        Age2029,
        [EnumMember(Value = "30-39")]
        Age3039,
        [EnumMember(Value = "40-49")]
        Age4049,
        [EnumMember(Value = "50-59")]
        Age5059,
        [EnumMember(Value = "60-69")]
        Age6069,
        [EnumMember(Value = "70-79")]
        Age7079,
        [EnumMember(Value = ">80")]
        AgeOver80,
        [EnumMember(Value = "în procesare")]
        ProcessingData
    }
}
