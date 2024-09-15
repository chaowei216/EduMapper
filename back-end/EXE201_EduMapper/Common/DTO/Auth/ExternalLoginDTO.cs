using System.ComponentModel.DataAnnotations;

namespace Common.DTO.Auth
{
    public class ExternalLoginDTO
    {
        public string? FullName { get; set; }
        [Required]
        public string Email { get; set; } = null!;
        public string? Gender { get; set; } = null!;
        public DateTime? DateOfBirth { get; set; }
        public string? PhoneNumber { get; set; } = null!;
        public string? ImageLink { get; set; } = null!;
    }
}
