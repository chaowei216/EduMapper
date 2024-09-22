using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;
using DAO.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.GenericRepository.Repository
{
    public class MemberShipRepository : GenericRepository<MemberShip>, IMemberShipRepository
    {
        public MemberShipRepository(DataContext context) : base(context)
        {
        }

        public bool IsUniqueName(string name)
        {
            var membership = _context.MemberShips.Where(p => p.MemberShipName.ToLower() == name.ToLower()).FirstOrDefault();

            return membership == null;
        }

        public async Task<MemberShip?> GetMemberShipByName(string name)
        {
            return await _context.MemberShips.FirstOrDefaultAsync(p => p.MemberShipName == name);
        }
    }
}
