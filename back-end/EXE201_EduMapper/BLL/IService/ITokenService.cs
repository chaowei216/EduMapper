using Common.DTO.Auth;
using DAL.Models;

namespace BLL.IService
{
    public interface ITokenService
    {
        /// <summary>
        /// Revoke token
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        void RevokeToken(string token);

        /// <summary>
        /// Create token pair (access, refresh)
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<TokenDTO> CreateTokenPair(ApplicationUser user);

        /// <summary>
        /// Refresh token pair (access, refresh)
        /// </summary>
        /// <param name="tokens"></param>
        /// <returns></returns>
        Task<TokenDTO> RefreshTokenPair(TokenDTO tokens);

        /// <summary>
        /// get info from access token
        /// </summary>
        /// <param name="accessToken"></param>
        /// <returns></returns>
        AccessTokenDTO? GetAccessTokenData(string accessToken);
    }
}
