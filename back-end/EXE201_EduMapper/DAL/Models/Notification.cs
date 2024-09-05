using System.ComponentModel.DataAnnotations;

namespace DAO.Models
{
    public class Notification
    {
        [Key]
        public string NotificationId { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string NotificationType { get; set; } = null!;
        public DateTime CreatedTime { get; set; }
        public bool Status { get; set; }
        public ICollection<UserNotification> UserNotification { get; set; } = null!;
    }
}
