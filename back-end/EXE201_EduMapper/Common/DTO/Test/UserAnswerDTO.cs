using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Test
{
    public class UserAnswerDTO
    {
        public string UserId { get; set; } = null!;
        public string QuestionId { get; set; } = null!;
        public string? ChoiceId { get; set; } = null!;
        public string? UserChoice { get; set; } = null!;
        public string? Description { get; set; }
    }
}
