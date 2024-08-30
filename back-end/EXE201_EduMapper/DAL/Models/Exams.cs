using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Exams
    {
        [Key]
        public int ExamId { get; set; }
        public string ExamName { get; set; } = string.Empty;
        public int NumOfQuestions { get; set; }
        public int TestId { get; set; }
        [ForeignKey("TestId")]
        public Tests Test { get; set; } = null!;
        public ICollection<Passages> Passages { get; set; } = null!;
    }
}
