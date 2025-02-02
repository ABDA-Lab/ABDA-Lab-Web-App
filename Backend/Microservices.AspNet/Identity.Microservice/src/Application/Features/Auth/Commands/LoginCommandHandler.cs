using SharedLibrary.Abstractions.Messaging;
using SharedLibrary.ResponseModel;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Configs;

namespace Application.Features.Auth.Commands
{
    public record AuthResponse(string AccessToken, string RefreshToken);
    
    public sealed record LoginCommand(string Username, string Password) : ICommand<AuthResponse>;

    internal sealed class LoginCommandHandler : ICommandHandler<LoginCommand, AuthResponse>
    {
        private readonly UserManager<User> _userManager;
        private readonly EnvironmentConfig _config;

        public LoginCommandHandler(UserManager<User> userManager, EnvironmentConfig config)
        {
            _userManager = userManager;
            _config = config;
        }
        public async Task<Result<AuthResponse>> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(command.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, command.Password))
            {
                return Result.Failure<AuthResponse>(new Error("LoginCommand", "Invalid username or password."));
            }
            var accessToken = GenerateJwtToken(user, 15);
            var refreshToken = GenerateJwtToken(user, 60 * 24 * 7);

            return Result.Success(new AuthResponse(accessToken, refreshToken));

        }

        private string GenerateJwtToken(User user, int expireMinutes = 30)
        {
            var key = Encoding.UTF8.GetBytes(_config.JwtKey);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            claims.AddRange(_userManager.GetRolesAsync(user).Result.Select(role => new Claim(ClaimTypes.Role, role)));
            var tokenDescriptor = new JwtSecurityToken(
                issuer: _config.JwtIssuer,
                audience: _config.JwtIssuer,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expireMinutes),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            );
            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
