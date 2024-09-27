using Common.Constant.Notification;
using Common.DTO;
using Common.DTO.Query;
using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Repository;
using DAO.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.GenericRepository.Repository
{
    public class NotificationRepository : GenericRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(DataContext context) : base(context)
        {
        }

        public async Task<PagedList<Notification>> GetNotificationsOfUser(string userId, NotificationParameters parameters)
        {
            var ntfIdOfUser = await _context.UserNotifications.Where(p => p.UserId == userId).Select(p => p.NotificationId).ToListAsync();

            return await PagedList<Notification>.ToPagedList(_context.Notifications.Where(p => ntfIdOfUser.Contains(p.NotificationId) || p.NotificationType == NotificationConst.SYSTEM), parameters.PageNumber, parameters.PageSize);
        }

        public async Task<PagedList<Notification>> GetSystemNotifications(NotificationParameters parameters)
        {
            return await PagedList<Notification>.ToPagedList(_context.Notifications.Where(p => p.NotificationType == NotificationConst.SYSTEM), parameters.PageNumber, parameters.PageSize);
        }
    }
}
