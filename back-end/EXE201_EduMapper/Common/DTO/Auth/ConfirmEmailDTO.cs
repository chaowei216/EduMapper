namespace Common.DTO.Auth
{
    public class ConfirmEmailDTO
    {
        public string Email { get; set; } = null!;
        public string Token { get; set; } = null!;
    }
}
