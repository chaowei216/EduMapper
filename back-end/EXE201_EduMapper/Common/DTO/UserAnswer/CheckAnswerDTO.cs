using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.UserAnswer
{
    public class CheckAnswerDTO
    {
        public int? QuestionIndex { get; set; }
        public string QuestionText { get; set; } = null!;
        public string? UserChoice { get; set; } = null!;
        public string? CorrectAnswer { get; set; } = string.Empty;
        public bool? IsCorrect { get; set; }
        
    }
}
