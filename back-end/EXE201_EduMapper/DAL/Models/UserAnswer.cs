using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class UserAnswer
    {
        [Key]
        public string UserAnswerId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string QuestionId { get; set; } = null!;
        public string? ChoiceId { get; set; } = null!;
        public string UserChoice { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreateAt { get; set; }
        public bool? IsCorrect { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } = null!;
        [ForeignKey("QuestionId")]
        public Question Question { get; set; } = null!;
        [ForeignKey("ChoiceId")]
        public QuestionChoice? QuestionChoice { get; set; }
    }
}
