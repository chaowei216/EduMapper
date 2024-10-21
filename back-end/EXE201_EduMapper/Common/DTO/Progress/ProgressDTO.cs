using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Progress
{
    public class ProgressDTO
    {
        public string ProgressId { get; set; } = null!;
        public double? Percent { get; set; }
        public double? Score { get; set; }
        public DateTime TestedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string ExamId { get; set; } = null!;
        public string UserId { get; set; } = null!;
    }
}
