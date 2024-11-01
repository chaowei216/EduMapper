using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class TestResult
    {
        [Key]
        public string TestResultId { get; set; } = null!;
        public double? Score { get; set; }
        public DateTime TestedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string UserId { get; set; } = null!;
        public string TestId { get; set; } = null!;
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } = null!;
        [ForeignKey("TestId")]
        public Test Test { get; set; } = null!;
    }
}
