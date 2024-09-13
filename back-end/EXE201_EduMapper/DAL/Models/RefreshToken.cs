using DAL.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Models
{
    public class RefreshToken
    {
        [Key]
        public string RefreshTokenId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string JwtTokenId { get; set; } = null!;
        public string Token { get; set; } = null!;
        public bool IsRevoked { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? RevokedAt { get; set; }
        public DateTime ExpiredAt { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } = null!;
    }
}
