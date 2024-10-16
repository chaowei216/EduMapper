using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Exam
    {
        [Key]
        public string ExamId { get; set; } = null!;
        public string ExamName { get; set; } = string.Empty;
        public int NumOfQuestions { get; set; }
        public string ExamType { get; set; } = string.Empty!;
        public string? TestId { get; set; } = null!;
        [ForeignKey("TestId")]
        public Test? Test { get; set; } = null!;
        public ICollection<Passage> Passages { get; set; } = null!;
        public ICollection<Progress> Progress { get; set; } = null!;
    }
}
