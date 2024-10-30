using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Exam
{
    public class ScheduleSpeakingDTO
    {
        public string UserEmail { get; set; } = string.Empty;
        public DateTime ScheduleDate { get; set; }
        public string LinkMeet { get; set; } = null!;
    }
}
