using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message.Auth;
using Common.DTO.Auth;
using DAL.Models;
using DAL.UnitOfWork;
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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public TokenService(UserManager<ApplicationUser> userManager,
                            IUnitOfWork unitOfWork,
                            IConfiguration configuration)
        {
            _configuration = configuration;
            _userManager = userManager;
            _unitOfWork = unitOfWork;
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
            // check if it is a valid refresh token
            var refreshToken = _unitOfWork.RefreshTokenRepository.GetRefreshTokenByToken(tokens.RefreshToken);

            if (refreshToken == null)
            {
                return new TokenDTO();
            }

            // check data in access token if it is valid
            // check data in access token if it match with refresh token
            // if not match, revoke refresh token
            var accessData = GetAccessTokenData(tokens.AccessToken);

            if (accessData == null
                || accessData.UserId != refreshToken.UserId
                || accessData.JwtId != refreshToken.JwtTokenId)
            {
                _unitOfWork.RefreshTokenRepository.RevokeToken(refreshToken);

                return new TokenDTO();
            }

            // check if token is revoked, lock all refresh token in chain (fraud)
            if (refreshToken.IsRevoked)
            {
                // get all tokens in db of that chain
                var tokensInChain = _unitOfWork.RefreshTokenRepository.GetTokensByJwtID(refreshToken.JwtTokenId);

                // revoke all tokens in chain
                foreach (var token in tokensInChain)
                {
                    _unitOfWork.RefreshTokenRepository.RevokeToken(token);
                }

                return new TokenDTO();
            }

            // check expired time
            if (refreshToken.ExpiredAt < DateTime.Now)
            {
                _unitOfWork.RefreshTokenRepository.RevokeToken(refreshToken);
                return new TokenDTO();
            }

            // create new refresh token
            var newRefreshToken = new RefreshToken
            {
                UserId = refreshToken.UserId,
                Token = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString(),
                JwtTokenId = refreshToken.JwtTokenId,
            };
            
            _unitOfWork.RefreshTokenRepository.Insert(newRefreshToken);

            // revoke old refresh token
            _unitOfWork.RefreshTokenRepository.RevokeToken(refreshToken);

            // create a new access token
            var user = await _userManager.FindByIdAsync(newRefreshToken.UserId);

            var newAccessToken = await GenerateAccessToken(user!, newRefreshToken.JwtTokenId);

            return new TokenDTO
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken.Token
            };
        }

        public void RevokeToken(string token)
        {
            var refreshTokenDb = _unitOfWork.RefreshTokenRepository.GetRefreshTokenByToken(token);

            if (refreshTokenDb == null)
            {
                throw new BadRequestException(LogoutMessage.InValidToken);
            }

            if (refreshTokenDb.IsRevoked)
            {
                var tokens = _unitOfWork.RefreshTokenRepository.GetTokensByJwtID(refreshTokenDb.JwtTokenId).ToList();

                foreach (var tokenInChain in tokens)
                {
                    _unitOfWork.RefreshTokenRepository.RevokeToken(tokenInChain);
                }
            } else
            {
                _unitOfWork.RefreshTokenRepository.RevokeToken(refreshTokenDb);
            }
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
                RefreshTokenId = Guid.NewGuid().ToString(),
                UserId = userId,
                Token = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString(),
                JwtTokenId = jwtTokenId,
                CreatedAt = DateTime.Now,
                ExpiredAt = DateTime.Now.AddDays(30),
            };

            _unitOfWork.RefreshTokenRepository.Insert(refreshToken);
            _unitOfWork.Save();

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
