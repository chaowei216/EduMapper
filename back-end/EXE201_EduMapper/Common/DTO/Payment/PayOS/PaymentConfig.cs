namespace Common.DTO.Payment.PayOS
{
    public class PaymentConfig
    {
        public string ClientID { get; set; } = null!;
        public string ApiKey { get; set; } = null!;
        public string CheckSumKey { get; set; } = null!;
    }
}
