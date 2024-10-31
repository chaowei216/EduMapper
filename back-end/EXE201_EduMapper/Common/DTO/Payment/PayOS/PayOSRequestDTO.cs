namespace Common.DTO.Payment.PayOS
{
    public class PayOSRequestDTO
    {
        public string MemberShipName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int TotalPrice { get; set; }
        public string returnUrl { get; set; } = null!;
        public string cancelUrl { get; set; } = null!;
    }
}
