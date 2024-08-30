using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Courses
    {
        [Key]
        public int CourseID { get; set; }   
        public string CourseName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string LearningTime { get; set; } = string.Empty;
        public int ProgramId { get; set; }
        [ForeignKey("ProgramId")]
        public ProgramTrainings ProgramTraining { get; set; } = null!;
    }
}
