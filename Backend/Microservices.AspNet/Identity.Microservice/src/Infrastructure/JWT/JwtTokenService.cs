using System.Security.Claims;
using Application.Common.Jwt;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Logging;

namespace Infrastructure.JWT
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly IOptions<JwtConfigService> _jwtConfigOptions;
        private readonly ILogger<JwtTokenService> _logger;

        public JwtTokenService(IOptions<JwtConfigService> jwtConfigOptions, ILogger<JwtTokenService> logger)
        {
            _jwtConfigOptions = jwtConfigOptions;
            _logger = logger;
        }

        public string GenerateToken(Guid userId, int roleId, int expireMinutes, IEnumerable<Claim>? additionalClaims = null)
        {
            try
            {
            _logger.LogInformation("Starting token generation for userId: {UserId}, roleId: {RoleId}", userId, roleId);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim("roleId", roleId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            if (additionalClaims != null)
            {
                claims.AddRange(additionalClaims);
                _logger.LogDebug("Added additional claims. Total claims count: {ClaimsCount}", claims.Count);
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfigOptions.Value.JwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            _logger.LogDebug("Token configuration - Issuer: {Issuer}, Audience: {Audience}, Expiry: {ExpiryTime}", 
                _jwtConfigOptions.Value.JwtIssuer,
                _jwtConfigOptions.Value.JwtAudience,
                DateTime.UtcNow.AddMinutes(expireMinutes));

            var tokenDescriptor = new JwtSecurityToken(
                issuer: _jwtConfigOptions.Value.JwtIssuer,
                audience: _jwtConfigOptions.Value.JwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expireMinutes),
                signingCredentials: credentials
            );

            var token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
            _logger.LogInformation("Token successfully generated");
            return token;
            }
            catch (Exception ex)
            {
            _logger.LogError(ex, "Error generating token for userId: {UserId}", userId);
            throw;
            }
        }

        public long GetAccountIdFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfigOptions.Value.JwtKey));
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = _jwtConfigOptions.Value.JwtIssuer,
                ValidateAudience = true,
                ValidAudience = _jwtConfigOptions.Value.JwtAudience,
                ValidateLifetime = true
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            return long.Parse(jwtToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value);
        }

        public float GetExpireMinutesFromToken(string token)
        {
            try
            {
                var principal = GetPrincipalFromToken(token);
                var validatedToken = principal.Identities.FirstOrDefault()?.BootstrapContext as SecurityToken;
                if (validatedToken is JwtSecurityToken jwtToken)
                {
                    return (float)jwtToken.ValidTo.Subtract(DateTime.UtcNow).TotalMinutes;
                }
                throw new SecurityTokenException("Invalid token type.");
            }
            catch (Exception ex)
            {
                System.Console.WriteLine("GetExpireMinutesFromToken: " + ex.Message);
                return 0; // Trả về 0 nếu có lỗi
            }
        }

        public ClaimsPrincipal GetPrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfigOptions.Value.JwtKey));
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = _jwtConfigOptions.Value.JwtIssuer,
                ValidateAudience = true,
                ValidAudience = _jwtConfigOptions.Value.JwtAudience,
                ValidateLifetime = true
            }, out SecurityToken validatedToken);

            return tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = _jwtConfigOptions.Value.JwtIssuer,
                ValidateAudience = true,
                ValidAudience = _jwtConfigOptions.Value.JwtAudience,
                ValidateLifetime = true
            }, out validatedToken);


        }

        public int GetRoleIdFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfigOptions.Value.JwtKey));
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = _jwtConfigOptions.Value.JwtIssuer,
                ValidateAudience = true,
                ValidAudience = _jwtConfigOptions.Value.JwtAudience,
                ValidateLifetime = true
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            return int.Parse(jwtToken.Claims.First(claim => claim.Type == "roleId").Value);

        }

        public bool IsTokenValid(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfigOptions.Value.JwtKey));

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = _jwtConfigOptions.Value.JwtIssuer,
                ValidateAudience = true,
                ValidAudience = _jwtConfigOptions.Value.JwtAudience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero // Không cho phép sai lệch thời gian
            };

            try
            {
                // Xác thực token
                tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return true; // Token hợp lệ
            }
            catch
            {
                return false; // Token không hợp lệ
            }
        }
    }
}