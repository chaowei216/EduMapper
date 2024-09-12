namespace Common.DTO.Auth
{
    public class ExternalUserRequestDTO
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Avatar { get; set; } = null!;
    }
}
