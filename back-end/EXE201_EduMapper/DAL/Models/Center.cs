using DAO.Models;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Center
    {
        [Key]
        public string CenterId { get; set; } = null!; 
        public string CentersName { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string ContactInfor { get; set; } = string.Empty;
        public string? Description {  get; set; } = string.Empty;
        public string? ReviewText {  get; set; } = string.Empty;
        public double Rating { get; set; } 
        public DateTime ReviewDate { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; } = null!;
        public ICollection<ProgramTraining> ProgramTrainings { get; set; } = null!;
    }
}
