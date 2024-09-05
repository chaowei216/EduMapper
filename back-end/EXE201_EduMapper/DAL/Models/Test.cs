using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Test
    {
        [Key]
        public string TestId { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsRequired { get; set; }
        public ICollection<Exam> Exams { get; set; } = null!;
        public ICollection<Progress> Progress { get; set; } = null!;
    }
}
