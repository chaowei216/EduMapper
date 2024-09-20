using System.ComponentModel.DataAnnotations;

namespace Common.DTO.MemberShip
{
    public class MemberShipCreateDTO
    {
        [Required]
        public string MemberShipName { get; set; } = null!;
        public List<string>? Features { get; set; } = null!;
        public List<string>? NoFeatures { get; set; } = null!;
        [DataType(DataType.Currency)]
        public double Price { get; set; }
    }
}
