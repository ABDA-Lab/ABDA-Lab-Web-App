using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Features.Aws.Commands
{
    public class GeneratePresignedUrlRequest
    {
        public string BucketName { get; set; } = null!;
        public string ObjectKey { get; set; } = null!;
        public int ExpiryDurationMinutes { get; set; } = 15;
        public string HttpVerb { get; set; } = "GET";
    }
}