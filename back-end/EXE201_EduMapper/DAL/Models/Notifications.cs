using System.ComponentModel.DataAnnotations;

namespace DAO.Models
{
    public class Notifications
    {
        [Key]
        public int NotificationId { get; set; }
        public string Description { get; set; } = null!;
        public string NotificationType { get; set; } = null!;
        public DateTime CreatedTime { get; set; }
        public bool Status { get; set; }
        public ICollection<UserNotifications> UserNotification { get; set; } = null!;
    }
}
