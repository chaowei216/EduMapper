using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.User;
using Org.BouncyCastle.Asn1.Ocsp;

namespace BLL.IService
{
    public interface IAuthService
    {
        /// <summary>
        /// Login Normal (email, password)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> LoginNormal(LoginNormalRequestDTO request);

        /// <summary>
        /// Register
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> Register(RegisterRequestDTO request);

        /// <summary>
        /// Refresh token
        /// </summary>
        /// <param name="tokens"></param>
        /// <returns></returns>
        Task<ResponseDTO> RefreshTokenPair(TokenDTO tokens);

        /// <summary>
        /// Get user by access token
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetUserByToken(string token);

        /// <summary>
        /// Logout
        /// </summary>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        ResponseDTO Logout(string refreshToken);

        /// <summary>
        /// Change user's password
        /// </summary>
        /// <param name="token"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> ChangePassword(string token, ChangePasswordDTO request);

        /// <summary>
        /// Forgot Password (send otp)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> ForgotPassword(ForgotPasswordDTO request);

        /// <summary>
        /// Reset password
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> ResetPassword(ResetPasswordDTO request);
    }
}
