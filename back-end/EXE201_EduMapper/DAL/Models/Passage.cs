using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Passage
    {
        [Key]
        public string PassageId { get; set; } = null!;
        public string? PassageTitle { get; set; } = string.Empty;
        public string? PassageContent {  get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string ExamId { get; set; } = null!;
        [ForeignKey("ExamId")]
        public Exam Exam { get; set; } = null!;
        public ICollection<Question> SubQuestion { get; set; } = null!;
    }
}
