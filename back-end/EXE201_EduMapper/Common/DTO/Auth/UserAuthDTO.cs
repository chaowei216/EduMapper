namespace Common.DTO.Auth
{
    public class UserAuthDTO
    {
        public string Id { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
        public string? Avatar { get; set; }
        public bool ImageLinked { get; set; }
        public bool EmailConfirmed { get; set; }
        public string RoleName { get; set; } = null!;
    }
}
