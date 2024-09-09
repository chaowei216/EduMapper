using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;

namespace DAL.GenericRepository.Repository
{
    public class QuestionChoiceRepository : GenericRepository<QuestionChoice>, IQuestionChoiceRepository
    {
        public QuestionChoiceRepository(DataContext context) : base(context) { }
    }
}
