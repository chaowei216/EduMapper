using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Progress
    {
        [Key]
        public int ProgressId { get; set; }
        public double? Percent {  get; set; }
        public double? Score { get; set; }
        public DateTime TestedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string Status { get; set; }  = string.Empty;
        public string TestId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } = null!;
        [ForeignKey("TestId")]
        public Test Test { get; set; } = null!;
    }
}
