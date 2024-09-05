using DAL.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Models
{
    public class Transaction
    {
        [Key]
        public string TransactionId { get; set; } = null!;
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
        public string UserId { get; set; } = null!;
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } = null!;
    }
}
