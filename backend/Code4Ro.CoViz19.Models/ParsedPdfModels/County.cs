﻿using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Code4Ro.CoViz19.Models.ParsedPdfModels
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum County
    {
        [EnumMember(Value = "AB")] AB,
        [EnumMember(Value = "AR")] AR,
        [EnumMember(Value = "AG")] AG,
        [EnumMember(Value = "BC")] BC,
        [EnumMember(Value = "BH")] BH,
        [EnumMember(Value = "BN")] BN,
        [EnumMember(Value = "BT")] BT,
        [EnumMember(Value = "BV")] BV,
        [EnumMember(Value = "BR")] BR,
        [EnumMember(Value = "B")] B,
        [EnumMember(Value = "BZ")] BZ,
        [EnumMember(Value = "CS")] CS,
        [EnumMember(Value = "CL")] CL,
        [EnumMember(Value = "CJ")] CJ,
        [EnumMember(Value = "CT")] CT,
        [EnumMember(Value = "CV")] CV,
        [EnumMember(Value = "DB")] DB,
        [EnumMember(Value = "DJ")] DJ,
        [EnumMember(Value = "GL")] GL,
        [EnumMember(Value = "GR")] GR,
        [EnumMember(Value = "GJ")] GJ,
        [EnumMember(Value = "HR")] HR,
        [EnumMember(Value = "HD")] HD,
        [EnumMember(Value = "IL")] IL,
        [EnumMember(Value = "IS")] IS,
        [EnumMember(Value = "IF")] IF,
        [EnumMember(Value = "MM")] MM,
        [EnumMember(Value = "MH")] MH,
        [EnumMember(Value = "MS")] MS,
        [EnumMember(Value = "NT")] NT,
        [EnumMember(Value = "OT")] OT,
        [EnumMember(Value = "PH")] PH,
        [EnumMember(Value = "SM")] SM,
        [EnumMember(Value = "SJ")] SJ,
        [EnumMember(Value = "SB")] SB,
        [EnumMember(Value = "SV")] SV,
        [EnumMember(Value = "TR")] TR,
        [EnumMember(Value = "TM")] TM,
        [EnumMember(Value = "TL")] TL,
        [EnumMember(Value = "VS")] VS,
        [EnumMember(Value = "VL")] VL,
        [EnumMember(Value = "VN")] VN,
    }
}