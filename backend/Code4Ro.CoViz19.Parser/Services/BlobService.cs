using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Code4Ro.CoViz19.Parser.Services {
    public class BlobService : IFileService {
        private CloudBlobClient _client;
        private IOptions<BlobStorageOptions> _storageOptions;
        /// <summary>
        /// 
        /// </summary>
        public StorageCredentials Credentials => new StorageCredentials(_storageOptions.Value.AccountName, _storageOptions.Value.AccountKey);

        /// <inheritdoc />
        public BlobService(IOptions<BlobStorageOptions> storageOptions) {
            _storageOptions = storageOptions;
            _client = new CloudStorageAccount(Credentials, _storageOptions.Value.UseHttps).CreateCloudBlobClient();
        }

        /// <summary>
        /// Uploads a file from a stream in azure blob storage
        /// </summary>
        public async Task<string> UploadFromStreamAsync(Stream sourceStream, string mimeType, string extension) {
            // Get a reference to the container.
            var container = _client.GetContainerReference(_storageOptions.Value.Container);

            // Retrieve reference to a blob.
            var blockBlob = container.GetBlockBlobReference(Guid.NewGuid().ToString("N") + extension);

            // Create or overwrite the previous created blob with contents from stream.
            blockBlob.Properties.ContentType = mimeType;

            await blockBlob.UploadFromStreamAsync(sourceStream, sourceStream.Length);


            await blockBlob.SetPropertiesAsync();

            return blockBlob.Uri.ToString();
        }

        public async Task Initialize() {
            // Get a reference to the container.
            var container = _client.GetContainerReference(_storageOptions.Value.Container);

            // Create the container if it doesn't already exist.
            await container.CreateIfNotExistsAsync();
        }
    }
}
