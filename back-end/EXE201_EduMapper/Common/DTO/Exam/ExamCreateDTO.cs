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
        public string ExamNames { get; set; } = string.Empty;
        public string ExamNameType {  get; set; } = string.Empty;
        public string ExamType { get; set; } = string.Empty!;
        public List<string>? PassageIds { get; set; } = null!;
    }
}
