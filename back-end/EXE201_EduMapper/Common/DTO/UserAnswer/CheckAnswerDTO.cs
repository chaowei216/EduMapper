using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.UserAnswer
{
    public class CheckAnswerDTO
    {
        public string? CorrectAnswer { get; set; } = string.Empty;
        public int? QuestionIndex { get; set; }
        public string? UserChoice { get; set; } = null!;
        public bool IsCorrect { get; set; }
    }
}
