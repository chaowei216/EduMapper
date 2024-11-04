using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.UserAnswer
{
    public class ScoreReadingExam
    {
        public string UserId { get; set; } = null!;
        public string ExamId { get; set; } = null!;
        public double Score { get; set; }   
        public string? Description { get; set; }
    }
}

