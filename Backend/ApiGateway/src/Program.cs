using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

// Define CORS policy name
var corsPolicy = "AllowAllOrigins";

// Configure CORS to allow requests from frontend (e.g., Next.js at http://localhost:3000)
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Change this if frontend URL is different
              .AllowAnyMethod() // Allow GET, POST, PUT, DELETE, etc.
              .AllowAnyHeader() // Allow any headers (e.g., Content-Type, Authorization)
              .AllowCredentials(); // Allow cookies or authentication headers
    });
});


var ocelotConfiguration = new OcelotConfiguration
{
    Routes = new List<OcelotRoute>(),
    GlobalConfiguration = new OcelotGlobalConfiguration
    {
        BaseUrl = Environment.GetEnvironmentVariable("OCELOT_BASE_URL") ?? "http://localhost:8080"
    }
};

// Log the base URL
Console.WriteLine($"Base URL: {ocelotConfiguration.GlobalConfiguration.BaseUrl}");

int routeIndex = 1;
while (true)
{
    var upstreamPath = Environment.GetEnvironmentVariable($"ROUTE_{routeIndex}_UPSTREAM_PATH");
    if (string.IsNullOrEmpty(upstreamPath))
    {
        Console.WriteLine($"No more routes found. Stopping at route index {routeIndex}.");
        break; 
    }

    Console.WriteLine($"Route {routeIndex} - Upstream Path: {upstreamPath}");

    if (!int.TryParse(Environment.GetEnvironmentVariable($"ROUTE_{routeIndex}_DOWNSTREAM_PORT"), out int port))
    {
        throw new FormatException($"Invalid port value for ROUTE_{routeIndex}_DOWNSTREAM_PORT. Please provide a valid integer.");
    }

    var downstreamHost = Environment.GetEnvironmentVariable($"ROUTE_{routeIndex}_DOWNSTREAM_HOST") ?? "localhost";
    Console.WriteLine($"Route {routeIndex} - Downstream Host: {downstreamHost}, Port: {port}");

    var route = new OcelotRoute
    {
        UpstreamPathTemplate = upstreamPath,
        UpstreamHttpMethod = Environment.GetEnvironmentVariable($"ROUTE_{routeIndex}_UPSTREAM_METHODS")
            ?.Split(',')
            .Select(m => m.Trim())
            .ToArray() ?? Array.Empty<string>(),
        DownstreamScheme = "http",
        DownstreamHostAndPorts = new[]
        {
            new OcelotHostAndPort
            {
                Host = downstreamHost,
                Port = port
            }
        },
        DownstreamPathTemplate = Environment.GetEnvironmentVariable($"ROUTE_{routeIndex}_DOWNSTREAM_PATH") ?? upstreamPath
    };

    Console.WriteLine($"Route {routeIndex} - Downstream Path: {route.DownstreamPathTemplate}");

    ocelotConfiguration.Routes.Add(route);
    routeIndex++;
}

Console.WriteLine($"Total routes configured: {ocelotConfiguration.Routes.Count}");

var ocelotJson = JsonSerializer.Serialize(new
{
    Routes = ocelotConfiguration.Routes,
    GlobalConfiguration = ocelotConfiguration.GlobalConfiguration
});

Console.WriteLine("Serialized Ocelot Configuration:");
Console.WriteLine(ocelotJson);

var configBuilder = new ConfigurationBuilder();
configBuilder.AddJsonStream(new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(ocelotJson)));
var configuration = configBuilder.Build();

builder.Services.AddOcelot(configuration);

var app = builder.Build();
app.UseRouting();

app.UseWhen(context => context.Request.Path.StartsWithSegments("/health"), appBuilder =>
{
    appBuilder.Run(async context =>
    {
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync("{\"status\":\"Healthy\"}");
    });
});

// Use CORS before Ocelot middleware
app.UseCors(corsPolicy);
// Log CORS activation
Console.WriteLine("CORS policy applied.");

Console.WriteLine("Initializing Ocelot middleware...");

// Use Ocelot middleware
app.UseOcelot().Wait();

Console.WriteLine("Ocelot gateway is running.");



app.Run();

public class OcelotConfiguration
{
    public List<OcelotRoute> Routes { get; set; } = null!;
    public OcelotGlobalConfiguration GlobalConfiguration { get; set; } = null!;
}

public class OcelotRoute
{
    public string UpstreamPathTemplate { get; set; } = null!;
    public string[] UpstreamHttpMethod { get; set; } = null!;
    public string DownstreamScheme { get; set; } = null!;
    public OcelotHostAndPort[] DownstreamHostAndPorts { get; set; } = null!;
    public string DownstreamPathTemplate { get; set; } = null!;
}

public class OcelotHostAndPort
{
    public string Host { get; set; } = null!;
    public int Port { get; set; }
}

public class OcelotGlobalConfiguration
{
    public string BaseUrl { get; set; } = null!;
}