using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon.S3;
using Application.Behaviors;
using Application.Configs;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

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
                options.Credentials = new BasicAWSCredentials(config.AwsAccessKey, config.AwsSecretKey);
                options.Region = RegionEndpoint.GetBySystemName("ap-southeast-1");
            });

            services.AddSingleton<IAmazonS3>(serviceProvider =>
            {
                var awsOptions = serviceProvider.GetRequiredService<IOptions<AWSOptions>>().Value;
                System.Console.WriteLine(awsOptions.Credentials);
                var s3Config = new AmazonS3Config
                {
                    RegionEndpoint = awsOptions.Region,
                    ServiceURL = "https://s3.ap-southeast-1.wasabisys.com", // Wasabi endpoint URL
                    ForcePathStyle = true
                };

                return new AmazonS3Client(awsOptions.Credentials, s3Config);
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