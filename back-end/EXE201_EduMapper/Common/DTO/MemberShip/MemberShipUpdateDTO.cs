using System.ComponentModel.DataAnnotations;

namespace Common.DTO.MemberShip
{
    public class MemberShipUpdateDTO
    {
        [Required]
        public string MemberShipName { get; set; } = null!;
        public List<string>? Features { get; set; }
        public List<string>? NoFeatures { get; set; }
        [DataType(DataType.Currency)]
        public double Price { get; set; }
    }
}
