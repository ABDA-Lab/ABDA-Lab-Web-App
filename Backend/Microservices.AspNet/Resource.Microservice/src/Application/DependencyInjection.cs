using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon.S3;
using SharedLibrary.Behaviors;
using Application.Configs;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Amazon.SecurityToken;

namespace Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            var assembly = typeof(DependencyInjection).Assembly;
            services.AddSingleton<EnvironmentConfig>();
            using var serviceProvider = services.BuildServiceProvider();
            var config = serviceProvider.GetRequiredService<EnvironmentConfig>();
            services.Configure<AWSOptions>(options =>
            {
                options.Credentials = new BasicAWSCredentials(config.AwsAccessKeyUser, config.AwsSecretKeyUser);
                options.Region = RegionEndpoint.GetBySystemName("ap-southeast-1");
            });

            services.AddSingleton<IAmazonS3>(serviceProvider =>
            {
                var awsOptions = serviceProvider.GetRequiredService<IOptions<AWSOptions>>().Value;
                var s3Config = new AmazonS3Config
                {
                    RegionEndpoint = awsOptions.Region,
                    ServiceURL = "https://s3.ap-southeast-1.wasabisys.com",
                    ForcePathStyle = true
                };

                return new AmazonS3Client(awsOptions.Credentials, s3Config);
            });
            services.AddSingleton<IAmazonSecurityTokenService>(serviceProvider =>
            {
                var awsOptions = serviceProvider.GetRequiredService<IOptions<AWSOptions>>().Value;
                var stsConfig = new AmazonSecurityTokenServiceConfig
                {
                    RegionEndpoint = awsOptions.Region,
                    ServiceURL = "https://sts.ap-southeast-1.wasabisys.com",
                };

                return new AmazonSecurityTokenServiceClient(awsOptions.Credentials, stsConfig);
            });


            services.AddMediatR(configuration => configuration.RegisterServicesFromAssembly(assembly));
            services.AddValidatorsFromAssembly(assembly);
            services.AddAutoMapper(assembly);
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationPipelineBehavior<,>));
            services.AddValidatorsFromAssembly(assembly, includeInternalTypes: true);
            return services;

        }
    }
}