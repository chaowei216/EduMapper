using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;
using Microsoft.EntityFrameworkCore;

namespace DAL.GenericRepository.Repository
{
    public class MemberShipDetailRepository : GenericRepository<MemberShipDetail>, IMemberShipDetailRepository
    {
        public MemberShipDetailRepository(DataContext context) : base(context)
        {
        }

        public async Task<MemberShipDetail?> GetMemberShipDetail(string userId, string memberShipId)
        {
            return await _context.MemberShipDetails.FirstOrDefaultAsync(p => p.UserId == userId && p.MemberShipId == memberShipId);
        }

        public async Task<IEnumerable<MemberShipDetail>> GetMemberShipOfUser(string userId)
        {
            return await _context.MemberShipDetails.Where(p => p.UserId == userId).ToListAsync();
        }
    }
}
