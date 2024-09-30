using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Progress
{
    public class ProgressCreateDTO
    {
        public string ExamId { get; set; } = null!;
        public string UserId { get; set; } = null!;
    }
}
