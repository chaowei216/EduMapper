namespace Common.DTO.Payment
{
    public class PaymentRequestDTO
    {
        public string UserId { get; set; } = null!;
        public string MemberShipId { get; set; } = null!;
        public string PaymentMethod { get; set; } = null!;
    }
}
