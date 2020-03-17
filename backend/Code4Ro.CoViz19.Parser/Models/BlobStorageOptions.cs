namespace Code4Ro.CoViz19.Parser.Models
{
    /// <summary>
    /// Manages the details about the blob storage being used
    /// </summary>
    public class BlobStorageOptions {
        /// <summary>
        /// The account name used to connect to Blob Storage.
        /// </summary>
        public string AccountName { get; set; }

        /// <summary>
        /// The key used to connect to Blob Storage.
        /// </summary>
        public string AccountKey { get; set; }

        /// <summary>
        /// The name of the blob container.
        /// </summary>
        public string Container { get; set; }

        /// <summary>
        /// Whether or not use https to connect
        /// </summary>
        public bool UseHttps { get; set; }

        /// <summary>
        /// //convention
        /// </summary>
        public BlobStorageOptions Value => this;
    }
}