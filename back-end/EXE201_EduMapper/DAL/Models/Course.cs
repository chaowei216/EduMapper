using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Course
    {
        [Key]
        public string CourseId { get; set; } = null!;   
        public string CourseName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string LearningTime { get; set; } = string.Empty;
        public string ProgramId { get; set; } = null!;
        [ForeignKey("ProgramId")]
        public ProgramTraining ProgramTraining { get; set; } = null!;
    }
}
