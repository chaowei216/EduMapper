using Common.DTO.Question;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Passage
{
    public class PassageCreateDTO
    {
        public string? PassageTitle { get; set; } = string.Empty;
        public string? PassageContent { get; set; } = string.Empty;
        public ICollection<QuestionCreateDTO> SubQuestion { get; set; } = null!;
        public ICollection<PassageSectionCreateDTO> Sections { get; set; } = null!;
    }
}
