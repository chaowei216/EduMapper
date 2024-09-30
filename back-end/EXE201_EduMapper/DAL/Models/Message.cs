using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Message
    {
        [Key]
        public string MessageId { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string UserId { get; set; } = null!;
        public ApplicationUser User { get; set; } = null!;
    }
}
