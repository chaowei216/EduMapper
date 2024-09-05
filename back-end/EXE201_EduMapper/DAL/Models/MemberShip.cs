using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class MemberShip
    {
        [Key]
        public string MemberShipId { get; set; } = null!;
        public string MemberShipName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public ICollection<MemberShipDetail> MemberShipDetails { get; set; } = null!;
    }
}
