using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Question
{
    public class QuestionCreateDTO
    {
        [Required]
        public string QuestionText { get; set; } = null!;
        [Required]
        public string CorrectAnswer { get; set; } = string.Empty;
        [Required]
        public string QuestionType { get; set; } = string.Empty;
        [AllowNull]
        public int? WordsLimit { get; set; } = null!;
        [AllowNull]
        public ICollection<QuestionChoiceDTO>? Choices { get; set; } = null!;
    }
}
