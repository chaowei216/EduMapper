using DAL.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Models
{
    public class Feedback
    {
        [Key]
        public string FeedbackId { get; set; } = null!;
        [Required]
        public string? Description { get; set; } = null!;
        [Required]
        public int Rating { get; set; }
        public string FromId { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string ToId { get; set; } = null!;
        [ForeignKey("FromId")]
        public ApplicationUser From { get; set; } = null!;
        [ForeignKey("ToId")]
        public Center To { get; set; } = null!;

    }
}
