using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Models
{
    public class Transactions
    {
        [Key]
        public int TransactionId { get; set; }
        [Required]
        public string TransactionNumber { get; set; } = null!;
        [Required]
        public string PaymentMethod { get; set; } = null!;
        [Required]
        public string TransactionInfo { get; set; } = null!;
        [Required]
        public DateTime? TransactionDate { get; set; }
        [Required]
        public double Amount { get; set; }
        [Required]
        public string Status { get; set; } = null!;
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users User { get; set; } = null!;
    }
}
