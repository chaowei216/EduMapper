namespace DAL.Models
{
    public class UserAnswer
    {
        public string UserId { get; set; } = null!;
        public string QuestionId { get; set; } = null!;
        public string UserChoice { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreateAt { get; set; }
        public bool IsCorrect { get; set; }
        public ApplicationUser User { get; set; } = null!;
        public Question Question { get; set; } = null!;   
    }
}
