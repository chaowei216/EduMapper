namespace Common.DTO.Payment
{
    public class PaymentResponseDTO
    {
        public string UserId { get; set; } = null!;
        public string TransactionInfo { get; set; } = null!;
        public string TransactionNumber { get; set; } = null!;
        public bool IsSuccess { get; set; }
    }
}
