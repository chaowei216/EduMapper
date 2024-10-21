using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Common.DTO.Transaction
{
    public class TransactionDTO
    {
        public string TransactionId { get; set; } = null!;
        public string TransactionNumber { get; set; } = null!;
        public string PaymentMethod { get; set; } = null!;
        public string TransactionInfo { get; set; } = null!;
        public DateTime? TransactionDate { get; set; }
        public double Amount { get; set; }
        public string Status { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string MemberShipName { get; set; } = null!;
    }
}
