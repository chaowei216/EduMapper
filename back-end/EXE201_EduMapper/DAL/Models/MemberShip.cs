using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class MemberShip
    {
        [Key]
        public string MemberShipId { get; set; } = null!;
        public string MemberShipName { get; set; } = string.Empty;
        public List<string>? Features { get; set; }
        public List<string>? NoFeatures { get; set; }
        public double Price { get; set; }
        public ICollection<MemberShipDetail> MemberShipDetails { get; set; } = null!;
    }
}
