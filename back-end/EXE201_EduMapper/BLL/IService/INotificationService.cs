using Common.DTO;
using Common.DTO.Notification;
using Common.DTO.Query;
using DAO.Models;

namespace BLL.IService
{
    public interface INotificationService
    {
        /// <summary>
        /// Add new notification
        /// </summary>
        /// <param name="notification"></param>
        /// <returns></returns>
        void AddNotification(Notification notification);

        /// <summary>
        /// Add new user notification
        /// </summary>
        /// <param name="notification"></param>
        /// <returns></returns>
        void AddUserNotification(UserNotification notification);

        /// <summary>
        /// Get all notification of user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetNotificationsOfUser(string userId, NotificationParameters parameters);

        /// <summary>
        /// Add new system notification
        /// </summary>
        /// <param name="notification"></param>
        /// <returns></returns>
        ResponseDTO AddSystemNotification(NotificationCreateDTO notification);

        /// <summary>
        /// Get all system notifications
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetSystemNotifications(NotificationParameters parameters);
    }
}
