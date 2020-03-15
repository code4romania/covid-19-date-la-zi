using Code4Ro.CoViz19.Api.Services;
using Microsoft.AspNetCore.Mvc.Testing;
using Moq;
using Shouldly;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Code4Ro.CoViz19.Api.Tests
{
    public class AuthenticationIntegrationTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly CustomWebApplicationFactory<Startup> _factory;
        private readonly Mock<IApiKeyProvider> mockProvider = new Mock<IApiKeyProvider>();
        public AuthenticationIntegrationTests()
        {
            mockProvider.Setup(x => x.IsValidApiKey(It.IsAny<string>())).Returns<string>(GetValidationResult);

            _factory = new CustomWebApplicationFactory<Startup>();

            // setup the swaps
            _factory.Registrations = services =>
            {
                services.SwapSingletone<IApiKeyProvider>(x => mockProvider.Object);
            };
        }

        private bool GetValidationResult(string key)
        {
            if (key == "my-random-valid-key")
            {
                return true;
            }
            return false;
        }

        [Theory]
        [InlineData("/api/v1/admin/update")]
        //add here routes what you want to be secured
        public async Task Given_an_unothorized_call_should_return_a_403_response(string route)
        {
            var httpClient = _factory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Post, route);
            request.Content = new StringContent("{}", Encoding.UTF8, "application/json");

            var apiKey = "random-invalid-api-key";
            request.Headers.Add("api-key", apiKey);

            var response = await httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();

            response.StatusCode.ShouldBe(HttpStatusCode.Unauthorized);
        }

        [Theory]
        [InlineData("/api/v1/admin/update")]
        //add here routes what you want to be secured
        public async Task Given_an_authorized_call_should_return_a_200_response(string route)
        {
            var httpClient = _factory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Post, route);
            request.Content = new StringContent("{}", Encoding.UTF8, "application/json");

            var apiKey = "my-random-valid-key";
            request.Headers.Add("api-key", apiKey);

            var response = await httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();

            response.StatusCode.ShouldBe(HttpStatusCode.OK);
        }

    }
}
