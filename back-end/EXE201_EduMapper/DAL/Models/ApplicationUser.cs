using DAO.Models;
using Microsoft.AspNetCore.Identity;

namespace DAL.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; } = null!;
        public string? Avatar { get; set; }
        public string? ImageLink { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Status { get; set; }
        public string Gender { get; set; } = null!;
        public ICollection<UserNotification> UserNotifications { get; set; } = null!;
        public ICollection<Transaction> Transactions { get; set; } = null!;
        public ICollection<RefreshToken> RefreshTokens { get; set; } = null!;
        public ICollection<UserReference> UserReferences { get; set; } = null!;
        public ICollection<MemberShipDetail> MemberShipDetails { get; set; } = null!;
        public ICollection<Feedback> FromFeedbacks { get; set; } = null!;
        public ICollection<Progress> Progress { get; set; } = null!;
        public ICollection<UserAnswer> UserAnswers { get; set; } = null!;
        public ICollection<TestResult> Results { get; set; }
        public ICollection<Message> Messages { get; set; } = null!;
    }
}
