using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;

namespace DAL.GenericRepository.Repository
{
    public class IExamRepository : GenericRepository<Exam>, IRepository.IExamRepository
    {
        public IExamRepository(DataContext context) : base(context)
        {
        }
    }
}
