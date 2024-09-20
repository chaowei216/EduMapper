using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Question
{
    public class QuestionDTO
    {
        public string QuestionText { get; set; } = null!;
        public string CorrectAnswer { get; set; } = string.Empty;
        public string QuestionType { get; set; } = string.Empty;
        public int? WordsLimit { get; set; } = null!;
        public string? PassageId { get; set; } = null!;
        public ICollection<QuestionChoiceDTO>? Choices { get; set; } = null!;
    }
}
