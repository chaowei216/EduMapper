using DAL.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Models
{
    public class Feedbacks
    {
        [Key]
        public int FeedbackId { get; set; }
        [Required]
        public string? Description { get; set; } = null!;
        [Required]
        public int Rating { get; set; }
        public int FromId { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public int ToId { get; set; }
        [ForeignKey("FromId")]
        public Users From { get; set; } = null!;
        [ForeignKey("ToId")]
        public Centers To { get; set; } = null!;

    }
}
