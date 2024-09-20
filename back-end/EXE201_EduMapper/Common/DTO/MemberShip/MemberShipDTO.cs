namespace Common.DTO.MemberShip
{
    public class MemberShipDTO
    {
        public string MemberShipId { get; set; } = null!;
        public string MemberShipName { get; set; } = string.Empty;
        public List<string>? Features { get; set; }
        public List<string>? NoFeatures { get; set; }
        public double Price { get; set; }
    }
}
