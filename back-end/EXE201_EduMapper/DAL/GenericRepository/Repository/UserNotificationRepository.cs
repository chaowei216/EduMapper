using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Repository;
using DAO.Models;

namespace DAL.GenericRepository.Repository
{
    public class UserNotificationRepository : GenericRepository<UserNotification>, IUserNotificationRepository
    {
        public UserNotificationRepository(DataContext context) : base(context) { }
    }
}
