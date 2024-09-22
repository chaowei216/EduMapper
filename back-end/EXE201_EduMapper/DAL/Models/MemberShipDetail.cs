using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class MemberShipDetail
    {
        [Key]
        public string MemberShipDetailId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string MemberShipId { get; set; } = null!;
        public DateTime RegistedDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public ApplicationUser User { get; set; } = null!;
        public MemberShip MemberShip { get; set; } = null!;
    }
}
