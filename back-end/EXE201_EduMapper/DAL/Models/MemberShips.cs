using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class MemberShips
    {
        [Key]
        public int MemberShipId { get; set; }
        public string MemberShipName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public ICollection<MemberShipDetails> MemberShipDetails { get; set; } = null!;
    }
}
