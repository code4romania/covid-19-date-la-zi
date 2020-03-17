namespace Code4Ro.CoViz19.Parser.Models {
    public class S3StorageOptions {
        public string ServiceUrl { get; set; }
        public string ApiKey { get; set; }
        public string Secret { get; set; }
        public string Region { get; set; }
        public string BucketName { get; set; }
        public string LatestDataFileName { get; set; }
    }
}
