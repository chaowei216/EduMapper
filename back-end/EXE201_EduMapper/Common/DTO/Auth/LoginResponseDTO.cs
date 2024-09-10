namespace Common.DTO.Auth
{
    public class LoginResponseDTO
    {
        public UserAuthDTO User { get; set; } = null!;
        public string AccessToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
    }
}
