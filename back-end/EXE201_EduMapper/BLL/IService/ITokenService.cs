using Common.DTO.Auth;
using DAL.Models;

namespace BLL.IService
{
    public interface ITokenService
    {
        Task RevokeToken(string token);
        Task<TokenDTO> CreateTokenPair(ApplicationUser user);
        Task<TokenDTO> RefreshTokenPair(TokenDTO tokens);
    }
}
