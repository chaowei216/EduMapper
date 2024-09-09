using BLL.IService;
using Common.DTO.Auth;
using DAL.Models;
using DAL.Repository;
using DAO.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BLL.Service
{
    public class TokenService : ITokenService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IGenericRepository<RefreshToken> _refreshTokenRepository;
        private readonly IConfiguration _configuration;

        public TokenService(UserManager<ApplicationUser> userManager,
                            IGenericRepository<RefreshToken> refreshTokenRepository,
                            IConfiguration configuration)
        {
            _configuration = configuration;
            _userManager = userManager;
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<TokenDTO> CreateTokenPair(ApplicationUser user)
        {
            // create a new jwt id
            var jwtId = Guid.NewGuid().ToString();

            // access token
            var accessToken = await GenerateAccessToken(user, jwtId);

            // refresh token
            var refreshToken = GenerateNewRefreshToken(user.Id, jwtId);

            return new TokenDTO
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<TokenDTO> RefreshTokenPair(TokenDTO tokens)
        {
            throw new NotImplementedException();
        }

        public Task RevokeToken(string token)
        {
            throw new NotImplementedException();
        }

        private async Task<string> GenerateAccessToken(ApplicationUser user, string jwtId)
        {
            // claims
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Role, roles[0]),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, jwtId),
            };

            // secret key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

            // credential
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // token setting
            var token = new JwtSecurityToken(
                            _configuration["Jwt:Issuer"]!,
                            _configuration["Jwt:Audience"],
                            claims,
                            expires: DateTime.Now.AddMinutes(25),
                            signingCredentials: credentials);

            // write jwt token
            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            return jwtToken;
        }

        private string GenerateNewRefreshToken(string userId, string jwtTokenId)
        {
            RefreshToken refreshToken = new()
            {
                UserId = userId,
                Token = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString(),
                JwtTokenId = jwtTokenId
            };

            _refreshTokenRepository.Insert(refreshToken);

            return refreshToken.Token.ToString();
        }

        private AccessTokenDTO? GetAccessTokenData(string accessToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtInfo = tokenHandler.ReadJwtToken(accessToken);

            if (jwtInfo == null) return null;

            return new AccessTokenDTO
            {
                UserId = jwtInfo.Claims.FirstOrDefault(u => u.Type == JwtRegisteredClaimNames.Sub)!.Value,
                JwtId = jwtInfo.Claims.FirstOrDefault(u => u.Type == JwtRegisteredClaimNames.Jti)!.Value
            };
        }
    }
}
