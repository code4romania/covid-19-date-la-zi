using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Models.V2
{
    public class LastDataUpdateDetailsModel
    {
        [JsonProperty(PropertyName = "last_updated_on")] public long DataLastUpdatedOn { get; set; }
        [JsonProperty(PropertyName = "last_updated_on_string")] public string DataLastUpdatedOnString { get; set; }
    }
}
