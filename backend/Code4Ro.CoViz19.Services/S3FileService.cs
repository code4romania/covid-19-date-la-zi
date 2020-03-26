using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Amazon;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Code4Ro.CoViz19.Services.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Code4Ro.CoViz19.Services
{
    public class S3FileService : IFileService
    {
        private readonly S3StorageOptions _s3Configuration;
        private readonly IAmazonS3 _client;
        private readonly ILogger<S3FileService> _logger;

        public S3FileService(ILogger<S3FileService> logger, IOptions<S3StorageOptions> awsConfiguration)
        {
            _logger = logger;
            _s3Configuration = awsConfiguration.Value;
            var awsOptions = new AWSOptions
            {
                Region = RegionEndpoint.GetBySystemName(_s3Configuration.Region),
                Credentials = new BasicAWSCredentials(_s3Configuration.ApiKey, _s3Configuration.Secret)
            };

            _client = awsOptions.CreateServiceClient<IAmazonS3>();
        }
        public async Task<string> GetRawData()
        {
            var request = new GetObjectRequest
            {
                BucketName = _s3Configuration.BucketName,
                Key = _s3Configuration.LatestDataFileName
            };
            string responseBody = null;

            try
            {
                using (var response = await _client.GetObjectAsync(request))
                using (var responseStream = response.ResponseStream)
                using (var reader = new StreamReader(responseStream))
                {
                    responseBody = reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception retrieving file from {_s3Configuration.BucketName}: {ex.Message}");
                return responseBody;
            }

            return responseBody;
        }

        public async Task SaveRawData(string fileContent)
        {
            var byteArray = Encoding.UTF8.GetBytes(fileContent);
            await using var stream = new MemoryStream(byteArray);

            var request = new TransferUtilityUploadRequest();
            using var utility = new TransferUtility(_client);
            request.BucketName = _s3Configuration.BucketName;
            request.Key = _s3Configuration.LatestDataFileName;
            request.InputStream = stream;

            await utility.UploadAsync(request);
        }
    }
}
