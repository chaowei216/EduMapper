using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class ProgramTrainings
    {
        [Key]
        public int ProgramId { get; set; }
        public string ProgramName { get; set; } = string.Empty;
        public string ProgramDescription { get; set; } = string.Empty;
        public string Level {  get; set; } = string.Empty;
        public string Type {  get; set; } = string.Empty;
        public int CentersId { get; set; }
        [ForeignKey("CentersId")]
        public Centers Centers { get; set; } = null!;
        public ICollection<Courses> Courses { get; set; } = null!;
    }
}
