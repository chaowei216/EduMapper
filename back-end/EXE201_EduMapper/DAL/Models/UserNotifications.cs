using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Models
{
    public class UserNotifications
    {
        public int UserId { get; set; }    
        public int NotificationId { get; set; }
        public Users User { get; set; } = null!;
        public Notifications Notification { get; set; } = null!;
    }
}
