using Common.DTO.Question;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Passage
{
    public class PassageDTO
    {
        public string PassageId { get; set; } = null!;
        public string? PassageTitle { get; set; } = string.Empty;
        public string? PassageContent { get; set; } = string.Empty;
        public string? ListeningFile {  get; set; } 
        public ICollection<QuestionDTO> SubQuestion { get; set; } = null!;
        public ICollection<PassageSectionDTO> Sections { get; set; } = null!;
    }
}
