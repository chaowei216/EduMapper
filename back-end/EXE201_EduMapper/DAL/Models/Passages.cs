using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Passages
    {
        [Key]
        public int PassageId { get; set; }
        public string? PassageTitle { get; set; } = string.Empty;
        public string? PassageContent {  get; set; } = string.Empty;
        public string? PassageSubQuestion {  get; set; } = string.Empty;
        public DateTime CreateAt { get; set; }
        public int ExamId { get; set; }
        [ForeignKey("ExamId")]
        public Exams Exam { get; set; } = null!;
        public ICollection<Questions> Questions { get; set; }
    }
}
