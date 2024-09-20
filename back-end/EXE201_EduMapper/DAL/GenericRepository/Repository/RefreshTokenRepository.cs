using Common.DTO.Auth;
using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Repository;
using DAO.Models;

namespace DAL.GenericRepository.Repository
{
    public class RefreshTokenRepository : GenericRepository<RefreshToken>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(DataContext context) : base(context) { }

        public RefreshToken? GetRefreshTokenByToken(string token)
        {
            return _context.RefreshTokens.Where(p => p.Token == token).FirstOrDefault();
        }

        public IEnumerable<RefreshToken> GetTokensByJwtID(string jwtID)
        {
            return _context.RefreshTokens.Where(p => p.JwtTokenId == jwtID).ToList();
        }

        public void RevokeToken(RefreshToken refreshToken)
        {
            refreshToken.IsRevoked = true;
            refreshToken.RevokedAt = DateTime.Now;
            _context.RefreshTokens.Update(refreshToken);
        }
    }
}
