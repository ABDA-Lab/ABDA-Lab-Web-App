
using Amazon.CloudFront;
using Amazon.S3;
using Amazon.SecurityToken;
using Application.Configs;
using SharedLibrary.Abstractions.Messaging;
using SharedLibrary.ResponseModel;

namespace Application.Features.Aws.Commands
{
    public sealed record CreateCloudFrontSignedCookieCommand(
        string ResourceUrl,
        int ExpiryHour
    ) : ICommand<Dictionary<string, string>>;

    internal sealed class CreateCloudFrontSignedCookieCommandHandler : ICommandHandler<CreateCloudFrontSignedCookieCommand, Dictionary<string, string>>
    {
        private readonly IAmazonS3 _s3Client;

        private readonly EnvironmentConfig _config;

        private readonly IAmazonSecurityTokenService _stsClient;

        public CreateCloudFrontSignedCookieCommandHandler(EnvironmentConfig config, IAmazonS3 s3Client, IAmazonSecurityTokenService stsClient)
        {
            _config = config;
            _s3Client = s3Client;
            _stsClient = stsClient;
        }

        public async Task<Result<Dictionary<string, string>>> Handle(CreateCloudFrontSignedCookieCommand command, CancellationToken cancellationToken)
        {
            var cookies = AmazonCloudFrontCookieSigner.GetCookiesForCustomPolicy(
                AmazonCloudFrontCookieSigner.Protocols.Https,
                _config.CloudFrontDistributionDomain,
                new StringReader(_config.CloudFrontPrivateKey),
                command.ResourceUrl,
                _config.CloudFrontKeyId,
                DateTime.UtcNow.AddHours(command.ExpiryHour),
                DateTime.UtcNow,
                "0.0.0.0/0"
            );

            var cookieDictionary = new Dictionary<string, string>
            {
                { cookies.Policy.Key, cookies.Policy.Value },    
                { cookies.Signature.Key, cookies.Signature.Value }, 
                { cookies.KeyPairId.Key, cookies.KeyPairId.Value }  
            };
            return cookieDictionary;
        }
    }
}