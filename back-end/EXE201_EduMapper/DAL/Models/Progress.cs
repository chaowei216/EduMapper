using DAO.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Progress
    {
        [Key]
        public int ProgressId { get; set; }
        public double? Percent {  get; set; }
        public double? Score { get; set; }
        public DateTime TestDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string Status { get; set; }  = string.Empty;
        public int TestId { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users User { get; set; } = null!;
        [ForeignKey("TestId")]
        public Tests Test { get; set; } = null!;
    }
}
