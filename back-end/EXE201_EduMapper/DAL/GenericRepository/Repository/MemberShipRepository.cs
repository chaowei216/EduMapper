using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;
using DAO.Models;

namespace DAL.GenericRepository.Repository
{
    public class MemberShipRepository : GenericRepository<MemberShip>, IMemberShipRepository
    {
        public MemberShipRepository(DataContext context) : base(context)
        {
        }
    }
}
