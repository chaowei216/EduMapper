using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Exam
{
    public class RequestSpeakingDTO
    {
        public string ExamId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public DateTime TestDate { get; set; }
    }
}
