using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class QuestionChoice
    {
        [Key]
        public string ChoiceId { get; set; } = null!;
        public string ChoiceContent { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string QuestionId { get; set; } = null!;
        [ForeignKey("QuestionId")]
        public Question Questions { get; set; } = null!;
        public ICollection<UserAnswer> Answers { get; set; } = null!;
    }
}
