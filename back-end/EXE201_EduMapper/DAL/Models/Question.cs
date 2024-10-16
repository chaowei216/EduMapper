using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Question
    {
        [Key]
        public string QuestionId { get; set; } = null!;
        public string QuestionText { get; set; } = null!;
        public string? CorrectAnswer { get; set; } = string.Empty;
        public int? QuestionIndex { get; set; }
        public string QuestionType { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string? PassageId { get; set; } = null!;
        public int? WordsLimit { get; set; } = null!;
        [ForeignKey("PassageId")]
        public Passage? Passage { get; set; } = null!;
        public ICollection<QuestionChoice> Choices { get; set; } = null!;
        public ICollection<UserAnswer> UserAnswers { get; set; } = null!;
        }
}
