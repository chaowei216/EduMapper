using DAL.Models;

namespace DAO.Models
{
    public class UserNotification
    {
        public string UserId { get; set; } = null!;    
        public string NotificationId { get; set; } = null!;
        public ApplicationUser User { get; set; } = null!;
        public Notification Notification { get; set; } = null!;
    }
}
