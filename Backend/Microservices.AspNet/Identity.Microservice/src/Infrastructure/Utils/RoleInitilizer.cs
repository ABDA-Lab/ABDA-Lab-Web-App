using Domain.Entities;
using MassTransit;
using Microsoft.AspNetCore.Identity;
using SharedLibrary.Contracts.RoleInitializeFlow;
using SharedLibrary.Enum;


namespace Infrastructure.Utils
{
    public class RoleInitializer
    {
        private readonly RoleManager<Role> _roleManager;
        private readonly IPublishEndpoint _publishEndpoint;

        public RoleInitializer(RoleManager<Role> roleManager, IPublishEndpoint publishEndpoint)
        {
            _roleManager = roleManager;
            _publishEndpoint = publishEndpoint;
        }

        public async Task InitializeRolesAsync()
        {
            foreach (var roleName in Enum.GetNames(typeof(RoleEnum)))
            {
                if (!await _roleManager.RoleExistsAsync(roleName))
                {
                    var role = new Role { Name = roleName };
                    var result = await _roleManager.CreateAsync(role);
                    if (!result.Succeeded)
                    {
                        var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                        throw new Exception($"Failed to create role '{roleName}': {errors}");
                    }

                    await _publishEndpoint.Publish(new IdentityRoleCreatedEvent
                    {
                        CorrelationId = Guid.NewGuid(),
                        RoleId = role.Id,
                        Name = role.Name
                    });
                }
            }
        }
    }
}