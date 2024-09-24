using Common.DTO.Passage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Exam
{
    public class ExamCreateDTO
    {
        public string ExamName { get; set; } = string.Empty;
        public List<string> PassageIds { get; set; } = null!;
    }
}
