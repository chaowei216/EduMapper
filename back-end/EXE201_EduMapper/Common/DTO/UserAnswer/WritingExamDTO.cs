using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.UserAnswer
{
    public class WritingExamDTO
    {
        public string ExamId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string ExamName { get; set; } = string.Empty;
        public DateTime CreateAt { get; set; }
    }
}
