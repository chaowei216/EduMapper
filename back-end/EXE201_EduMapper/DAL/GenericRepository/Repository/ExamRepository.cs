using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;

namespace DAL.GenericRepository.Repository
{
    public class ExamRepository : GenericRepository<Exam>, IExamRepository
    {
        public ExamRepository(DataContext context) : base(context)
        {
        }
    }
}
