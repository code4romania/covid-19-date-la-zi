using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Code4Ro.CoViz19.Api.Models
{
    public class GenderAgeHistogramModel
    {
        public DateTime? DatePublished { get; set; }
        public string DatePublishedString { get; set; }
        [JsonProperty(PropertyName = "histogram")] public Dictionary<HistogramRangeEnum, HistogramModel> Histogram { get; set; }
        [JsonProperty(PropertyName = "total")] public int Total { get; set; }

    }

    public class HistogramModel
    {
        [JsonProperty(PropertyName = "women")] public int Women { get; set; }
        [JsonProperty(PropertyName = "men")] public int Men { get; set; }
    }

    public enum HistogramRangeEnum
    {
        [EnumMember(Value = "0-10")]
        Age010,
        [EnumMember(Value = "11-20")]
        Age1120,
        [EnumMember(Value = "21-30")]
        Age2130,
        [EnumMember(Value = "31-40")]
        Age3140,
        [EnumMember(Value = "41-50")]
        Age4150,
        [EnumMember(Value = "51-60")]
        Age5160,
        [EnumMember(Value = "61-70")]
        Age6170,
        [EnumMember(Value = "71-80")]
        Age7180,
        [EnumMember(Value = "81-90")]
        Age8190,
        [EnumMember(Value = "91-100")]
        Age91100,
    }
}
