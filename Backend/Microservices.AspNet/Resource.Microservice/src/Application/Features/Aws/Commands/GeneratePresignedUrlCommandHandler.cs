using Application.Abstractions.Messaging;
using Application.Common.ResponseModel;
using Amazon.S3;
using Amazon.S3.Model;
using System;

namespace Application.Features.Aws.Commands
{
    public sealed record GeneratePresignedUrlCommand(
    string BucketName,
    string ObjectKey,
    TimeSpan ExpiryDuration,
    HttpVerb HttpVerb
) : ICommand<string>;

    internal sealed class GeneratePresignedUrlCommandHandler : ICommandHandler<GeneratePresignedUrlCommand, string>
    {
        private readonly IAmazonS3 _s3Client;

        public GeneratePresignedUrlCommandHandler(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }

        public Task<Result<string>> Handle(GeneratePresignedUrlCommand command, CancellationToken cancellationToken)
        {

            var request = new GetPreSignedUrlRequest
            {
                BucketName = command.BucketName,
                Key = command.ObjectKey,
                Expires = DateTime.UtcNow.Add(command.ExpiryDuration),
                Verb = command.HttpVerb
            };

            var presignedUrl =  _s3Client.GetPreSignedURL(request);
            return Task.FromResult(Result.Success(presignedUrl));
        }
    }
}