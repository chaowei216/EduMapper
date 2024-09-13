using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;

namespace DAL.GenericRepository.Repository
{
    public class UserReferenceRepository : GenericRepository<UserReference>, IUserReferenceRepository
    {
        public UserReferenceRepository(DataContext context) : base(context) { }
    }
}
