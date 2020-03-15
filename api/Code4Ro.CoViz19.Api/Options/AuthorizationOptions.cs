using System;

namespace Code4Ro.CoViz19.Api.Options
{
    public class AuthorizationOptions
    {
        public ApiKey[] ApiKeys { get; set; }
    }

    public class ApiKey
    {
        public int Id { get; set; }
        public string Key { get; set; }
    }
}
