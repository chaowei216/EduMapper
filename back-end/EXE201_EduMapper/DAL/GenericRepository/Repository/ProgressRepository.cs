using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;

namespace DAL.GenericRepository.Repository
{
    public class ProgressRepository : GenericRepository<Progress>, IProgressRepository
    {
        public ProgressRepository(DataContext context) : base(context) { }
    }
}
