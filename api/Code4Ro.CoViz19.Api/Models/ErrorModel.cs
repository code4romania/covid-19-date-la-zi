using Newtonsoft.Json;

namespace Code4Ro.CoViz19.Api.Models
{
    public class ErrorModel
    {
        [JsonProperty(PropertyName = "Message")] public string Message { get; set; }
#if DEBUG
        [JsonProperty(PropertyName = "Detail")] public string Detail { get; set; }
#endif
    }
}
