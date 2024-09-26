using Common.DTO.Query;
using Common.DTO;
using DAL.Repository;
using DAO.Models;

namespace DAL.GenericRepository.IRepository
{
    public interface INotificationRepository: IGenericRepository<Notification>
    {
        Task<PagedList<Notification>> GetNotificationsOfUser(string userId, NotificationParameters parameters);
        Task<PagedList<Notification>> GetSystemNotifications(NotificationParameters parameters);
    }
}
