using Common.Enum;
using DAL.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace DAO.Models
{
    public class Users
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [Range(1, 30)]
        public string Fullname { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
        public byte[] PasswordHash { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];
        public string? ResetPassToken { get; set; }
        [Required]
        [Range(10, 10)]
        public string Phonenumber { get; set; } = null!;
        [Required]
        public string DateOfBirth { get; set; } = null!;
        [Required]
        public string Gender { get; set; } = null!;
        public string? Otp { get; set; }
        public DateTime? OtpExpiredTime { get; set; }
        [Required]
        public bool IsVerified { get; set; }
        public int CoinBalance { get; set; }
        [AllowNull]
        public string? UserImage { get; set; } = null!;
        public string Status { get; set; } = string.Empty!;
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Roles Role { get; set; } = null!;
        public ICollection<UserNotifications> UserNotifications { get; set; } = null!;   
        public ICollection<Transactions> Transactions { get; set; } = null!;
        public ICollection<RefreshToken> RefreshTokens { get; set; } = null!;
        public ICollection<UserReferences> UserReferences { get; set; } = null!;
        public ICollection<MemberShipDetails> MemberShipDetails { get; set; } = null!;
        public ICollection<Feedbacks> FromFeedbacks { get; set; } = null!;
        public ICollection<Progress> Progress { get; set; } = null!;
        public ICollection<UserAnswers> UserAnswers { get; set; } = null!;
    }
}
