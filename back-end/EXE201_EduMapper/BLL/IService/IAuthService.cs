using Common.DTO;
using Common.DTO.Auth;

namespace BLL.IService
{
    public interface IAuthService
    {
        Task<ResponseDTO> LoginNormal(LoginNormalRequestDTO request);
        Task<ResponseDTO> Register(RegisterRequestDTO request);
    }
}
