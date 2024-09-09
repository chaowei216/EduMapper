using Common.DTO;
using Common.DTO.Auth;

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
    }
}
