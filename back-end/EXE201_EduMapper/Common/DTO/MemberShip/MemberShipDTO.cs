namespace Common.DTO.MemberShip
{
    public class MemberShipDTO
    {
        public string MemberShipId { get; set; } = null!;
        public string MemberShipName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
    }
}
