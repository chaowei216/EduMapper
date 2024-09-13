using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;

namespace DAL.GenericRepository.Repository
{
    public class CenterRepository : GenericRepository<Center>, ICenterRepository
    {
        public CenterRepository(DataContext context) : base(context)
        {
        }
    }
}
