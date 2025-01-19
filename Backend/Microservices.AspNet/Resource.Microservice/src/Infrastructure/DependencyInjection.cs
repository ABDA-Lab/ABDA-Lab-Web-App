using System;
using Infrastructure.Utils;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Application.Configs;
using Infrastructure.Repositories;
using SharedLibrary.Abstractions.UnitOfWork;
using SharedLibrary.Abstractions.Repositories;
using Infrastructure.Common;
using MassTransit;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            string solutionDirectory = Directory.GetParent(Directory.GetCurrentDirectory())?.FullName ?? "";
            if (solutionDirectory != null)
            {
                DotNetEnv.Env.Load(Path.Combine(solutionDirectory, ".env"));
            }
            
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            using var serviceProvider = services.BuildServiceProvider();
            var config = serviceProvider.GetRequiredService<EnvironmentConfig>();
            
            services.AddMassTransit(busConfigurator =>
            {

                busConfigurator.SetKebabCaseEndpointNameFormatter();
                busConfigurator.UsingRabbitMq((context, configurator) =>
                {
                    configurator.Host(new Uri($"rabbitmq://{config.RabbitMqHost}:{config.RabbitMqPort}/"), h =>
                    {
                        h.Username(config.RabbitMqUser);
                        h.Password(config.RabbitMqPassword);
                    });
                    configurator.ConfigureEndpoints(context);
                });
            });
            
            return services;
        }
    }
}