using Common.DTO.Feedback;
using Common.DTO.ProgramTraining;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Center
{
    public class CenterDTO
    {
        public string CentersName { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string ContactInfor { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string? ReviewText { get; set; } = string.Empty;
        public double Rating { get; set; }
        public DateTime ReviewDate { get; set; }
        public ICollection<FeedbackDTO> Feedbacks { get; set; } = null!;
        public ICollection<ProgramTrainingDTO> ProgramTrainings { get; set; } = null!;
    }
}
