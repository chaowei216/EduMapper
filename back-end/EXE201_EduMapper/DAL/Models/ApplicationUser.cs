using DAO.Models;
using Microsoft.AspNetCore.Identity;

namespace DAL.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; } = null!;
        public string? UserImage { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
        public string Status { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public ICollection<UserNotification> UserNotifications { get; set; } = null!;
        public ICollection<Transaction> Transactions { get; set; } = null!;
        public ICollection<RefreshToken> RefreshTokens { get; set; } = null!;
        public ICollection<UserReference> UserReferences { get; set; } = null!;
        public ICollection<MemberShipDetail> MemberShipDetails { get; set; } = null!;
        public ICollection<Feedback> FromFeedbacks { get; set; } = null!;
        public ICollection<Progress> Progress { get; set; } = null!;
        public ICollection<UserAnswer> UserAnswers { get; set; } = null!;
    }
}
