using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.UserAnswer
{
    public class ListAnswerDTO
    {
        public string QuestionId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string? Description { get; set; }
        public int? QuestionIndex { get; set; }
        public double? Score { get; set; }
    }
}
