namespace Code4Ro.CoViz19.Api.Services
{
    public interface IApiKeyValidator
    {
        bool IsValidApiKey(string potentialApiKey);
    }
}
