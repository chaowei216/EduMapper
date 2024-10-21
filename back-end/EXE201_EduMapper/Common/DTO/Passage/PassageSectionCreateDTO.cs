using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Passage
{
    public class PassageSectionCreateDTO
    {
        public string SectionLabel { get; set; } = null!;
        public string SectionContent { get; set; } = null!;
    }
}
