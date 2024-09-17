using Common.DTO.Passage;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Exam
{
    public class ExamDTO
    {
        public string ExamId { get; set; } = null!;
        public string ExamName { get; set; } = string.Empty;
        public int NumOfQuestions { get; set; }
        public string TestId { get; set; } = null!;
        public ICollection<PassageDTO> Passages { get; set; } = null!;
    }
}
