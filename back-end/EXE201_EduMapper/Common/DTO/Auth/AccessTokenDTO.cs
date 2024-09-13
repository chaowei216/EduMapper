namespace Common.DTO.Auth
{
    public class AccessTokenDTO
    {
        public string UserId { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string JwtId { get; set; } = null!;
    }
}
