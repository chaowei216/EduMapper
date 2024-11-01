using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.UserAnswer
{
    public class WritingAnswerDTO
    {
        public string UserAnswerId { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string QuestionText { get; set; } = null!;
        public string? PassageTitle { get; set; } = string.Empty;
        public string? PassageContent { get; set; } = string.Empty;
        public DateTime CreateAt { get; set; }
    }
}
