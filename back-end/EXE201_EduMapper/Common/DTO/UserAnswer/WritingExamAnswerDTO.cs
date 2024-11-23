using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.UserAnswer
{
    public class WritingExamAnswerDTO
    {
        public string QuestionId { get; set; } = null!;
        public int? QuestionIndex { get; set; }
        public string QuestionText { get; set; } = null!;
        public string UserChoice { get; set; } = null!;
        public string? PassageImage { get; set; } = string.Empty;
    }
}
