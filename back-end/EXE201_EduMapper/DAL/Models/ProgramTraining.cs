using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class ProgramTraining
    {
        [Key]
        public string ProgramId { get; set; } = null!;
        public string ProgramName { get; set; } = string.Empty;
        public string ProgramDescription { get; set; } = string.Empty;
        public string Level {  get; set; } = string.Empty;
        public string Type {  get; set; } = string.Empty;
        public string CentersId { get; set; } = null!;
        [ForeignKey("CentersId")]
        public Center Centers { get; set; } = null!;
        public ICollection<Course> Courses { get; set; } = null!;
    }
}
