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
        private readonly Mock<IApiKeyValidator> mockProvider = new Mock<IApiKeyValidator>();
        private const string VALID_API_KEY = "random-valid-api-key";
        private const string INVALID_API_KEY = "random-invalid-api-key";
        public AuthenticationIntegrationTests()
        {

            mockProvider.Setup(x => x.IsValidApiKey(VALID_API_KEY)).Returns(true);
            mockProvider.Setup(x => x.IsValidApiKey(INVALID_API_KEY)).Returns(false);
            _factory = new CustomWebApplicationFactory<Startup>();

            // setup the swaps
            _factory.Registrations = services =>
            {
                services.SwapSingletone(x => mockProvider.Object);
            };
        }


        [Theory]
        [InlineData("/api/v1/admin/update")]
        //add here routes what you want to be secured
        public async Task Given_an_unauthorized_call_should_return_a_403_response(string route)
        {
            var httpClient = _factory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Post, route);
            request.Content = new StringContent("{}", Encoding.UTF8, "application/json");

            request.Headers.Add("api-key", INVALID_API_KEY);

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

            request.Headers.Add("api-key", VALID_API_KEY);

            var response = await httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();

            response.StatusCode.ShouldBe(HttpStatusCode.OK);
        }

    }
}
