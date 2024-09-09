using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Repository;
using DAO.Models;

namespace DAL.GenericRepository.Repository
{
    public class FeedbackRepository : GenericRepository<Feedback>, MemberShipRepository
    {
        public FeedbackRepository(DataContext context) : base(context)
        {
        }
    }
}
