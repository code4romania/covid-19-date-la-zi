using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Services.Options;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Code4Ro.CoViz19.Services {
    public class BlobService : IFileService {
        private CloudBlobClient _client;
        private IOptions<BlobStorageOptions> _storageOptions;
        /// <summary>
        /// 
        /// </summary>
        public StorageCredentials Credentials => new StorageCredentials(_storageOptions?.Value?.AccountName, _storageOptions?.Value?.AccountKey);

        /// <inheritdoc />
        public BlobService(IOptions<BlobStorageOptions> storageOptions) {
            _storageOptions = storageOptions;
            if (storageOptions != null && !string.IsNullOrEmpty(storageOptions.Value?.AccountName) &&
                !string.IsNullOrEmpty(storageOptions.Value?.AccountKey) && 
                !string.IsNullOrEmpty(storageOptions.Value?.Container))
            {
                _client = new CloudStorageAccount(Credentials, _storageOptions.Value.UseHttps).CreateCloudBlobClient();
                // Get a reference to the container.
                var container = _client.GetContainerReference(_storageOptions?.Value.Container);
                // Create the container if it doesn't already exist.
                var result = container.CreateIfNotExistsAsync().Result;
            }
        }

        /// <summary>
        /// Uploads a file from a stream in azure blob storage
        /// </summary>
        public async Task<string> UploadFromStreamAsync(Stream sourceStream, string mimeType, string extension) {
            // Get a reference to the container.
            var container = _client.GetContainerReference(_storageOptions.Value.Container);
            
            var blockBlob = container.GetBlockBlobReference("latestData.json");
            var archiveDataFile = container.GetBlockBlobReference($"{DateTime.Now.ToString("yyyyMMddHHmmss")}/latestData.json");
            await archiveDataFile.StartCopyAsync(blockBlob);

            // Retrieve reference to a blob.
            //var blockBlob = container.GetBlockBlobReference(Guid.NewGuid().ToString("N") + extension);

            // Create or overwrite the previous created blob with contents from stream.
            blockBlob.Properties.ContentType = mimeType;

            await blockBlob.UploadFromStreamAsync(sourceStream, sourceStream.Length);

            await blockBlob.SetPropertiesAsync();

            return blockBlob.Uri.ToString();
        }

        public Task<string> GetRawData()
        {
            throw new NotImplementedException();
        }

        public async Task SaveRawData(string fileContent)
        {
            var byteArray = Encoding.ASCII.GetBytes(fileContent);
            await using var stream = new MemoryStream(byteArray);
            await UploadFromStreamAsync(stream, "application/json", ".json");
        }
    }

}
