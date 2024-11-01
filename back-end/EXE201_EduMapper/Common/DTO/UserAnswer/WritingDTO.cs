using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.UserAnswer
{
    public class WritingDTO
    {
        public string UserId { get; set; } = null!;
        public string QuestionId { get; set; } = null!;
        public string? UserChoice { get; set; } = null!;
        public string? Description { get; set; }
    }
}
