namespace Common.DTO.Notification
{
    public class NotificationDTO
    {
        public string NotificationId { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string NotificationType { get; set; } = null!;
        public DateTime CreatedTime { get; set; }
        public bool Status { get; set; }
    }
}
