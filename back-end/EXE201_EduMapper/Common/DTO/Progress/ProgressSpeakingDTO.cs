using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Progress
{
    public class ProgressSpeakingDTO
    {
        public string ProgressId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public DateTime TestedDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string ExamName { get; set; } = null!;
        public string ExamId { get; set; } = null!;
        public string UserEmail { get; set; } = null!;
        public string FullName { get; set; } = null!;
    }
}
