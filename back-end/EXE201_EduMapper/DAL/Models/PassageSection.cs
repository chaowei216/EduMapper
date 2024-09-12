using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class PassageSection
    {
        [Key]
        public string PassageSectionId { get; set; } = null!;
        public string SectionLabel { get; set; } = null!;
        public string SectionContent { get; set; } = null!;
        public string PassageId { get; set; } = null!;
        [ForeignKey("PassageId")]
        public Passage Passage { get; set; } = null!;
    }
}
