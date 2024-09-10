using DAL.Repository;
using DAO.Models;

namespace DAL.GenericRepository.IRepository
{
    public interface IRefreshTokenRepository : IGenericRepository<RefreshToken>
    {
        void RevokeToken(RefreshToken refreshToken);
        IEnumerable<RefreshToken> GetTokensByJwtID(string jwtID);
        RefreshToken? GetRefreshTokenByToken(string token);
    }
}
