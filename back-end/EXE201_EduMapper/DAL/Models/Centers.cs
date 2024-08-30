using DAO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Centers
    {
        public int CentersId { get; set; }  
        public string CentersName { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string ContactInfor { get; set; } = string.Empty;
        public string? Description {  get; set; } = string.Empty;
        public string? ReviewText {  get; set; } = string.Empty;
        public double Rating { get; set; } 
        public DateTime ReviewDate { get; set; }
        public ICollection<Feedbacks> Feedbacks { get; set; } = null!;
        public ICollection<ProgramTrainings> ProgramTrainings { get; set; } = null!;
    }
}
