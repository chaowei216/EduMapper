using System.ComponentModel.DataAnnotations;

namespace Common.DTO.MemberShip
{
    public class MemberShipUpdateDTO
    {
        [Required]
        public string MemberShipName { get; set; } = null!;
        [Required]
        public string Description { get; set; } = null!;
        [DataType(DataType.Currency)]
        public double Price { get; set; }
    }
}
