using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedLibrary.Configs;
namespace Application.Configs
{
    public class EnvironmentConfig : Config
    {
        public string AwsAccessKey => Environment.GetEnvironmentVariable("AWS_ACCESS_KEY") ?? "default";
        public string AwsSecretKey => Environment.GetEnvironmentVariable("AWS_SECRET_KEY") ?? "default";
        public string AwsAccessKeyUser => Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_USER") ?? "default";
        public string AwsSecretKeyUser => Environment.GetEnvironmentVariable("AWS_SECRET_KEY_USER") ?? "default";
        public string AwsRoleArn => Environment.GetEnvironmentVariable("AWS_ROLE_ARN") ?? "default";
    }
}