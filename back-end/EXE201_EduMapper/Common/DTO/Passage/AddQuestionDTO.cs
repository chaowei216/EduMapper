using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Passage
{
    public class AddQuestionDTO
    {
        public string PassageId { get; set; } = null!;
        public List<string> QuestionIds { get; set; } = null!;
    }
}
