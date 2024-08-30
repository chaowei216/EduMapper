using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Questions
    {
        [Key]
        public int QuestionId { get; set; }
        public string CorrectAnswer { get; set; } = string.Empty;
        public string QuestionType { get; set; } = string.Empty;
        public DateTime CreateAt { get; set; }
        public int PassageId { get; set; }
        [ForeignKey("PassageId")]
        public Passages Passages { get; set; } = null!;
        public ICollection<QuestionChoices> Choices { get; set; } = null!;
        public ICollection<UserAnswers> UserAnswers { get; set; } = null!;
        }
}
