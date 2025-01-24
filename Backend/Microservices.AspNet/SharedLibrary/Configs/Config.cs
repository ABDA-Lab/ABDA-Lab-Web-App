using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SharedLibrary.Configs
{
    public class Config
    {
        public string DatabaseHost => Environment.GetEnvironmentVariable("DATABASE_HOST") ?? "localhost";
        public int DatabasePort => int.TryParse(Environment.GetEnvironmentVariable("DATABASE_PORT"), out var port) ? port : 5432;
        public string DatabaseName => Environment.GetEnvironmentVariable("DATABASE_NAME") ?? "defaultdb";
        public string DatabaseUser => Environment.GetEnvironmentVariable("DATABASE_USERNAME") ?? "postgres";
        public string DatabasePassword => Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "password";
        public string DatabaseProvider => Environment.GetEnvironmentVariable("DATABASE_PROVIDER") ?? "postgres";
        public string RabbitMqHost => Environment.GetEnvironmentVariable("RABBITMQ_HOST") ?? "rabbit-mq";
        public int RabbitMqPort  => int.TryParse(Environment.GetEnvironmentVariable("RABBITMQ_PORT"), out var port) ? port : 5672;
        public string RabbitMqUser => Environment.GetEnvironmentVariable("RABBITMQ_USERNAME") ?? "username";
        public string RabbitMqPassword => Environment.GetEnvironmentVariable("RABBITMQ_PASSWORD") ?? "password";

        public string RedisHost => Environment.GetEnvironmentVariable("REDIS_HOST") ?? "redis";
        public string RedisPassword => Environment.GetEnvironmentVariable("REDIS_PASSWORD") ?? "default";
        public int RedisPort => int.TryParse(Environment.GetEnvironmentVariable("REDIS_PORT"), out var port) ? port : 6379;

        public string JwtIssuer => Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "default"; 
        public string JwtAudience => Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "default"; 
        public string JwtKey => Environment.GetEnvironmentVariable("JWT_KEY") ?? "default"; 
    }
}