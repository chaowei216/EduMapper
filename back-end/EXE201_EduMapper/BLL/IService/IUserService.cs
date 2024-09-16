using Common.DTO;
using Common.DTO.User;

namespace BLL.IService
{
    public interface IUserService
    {
        Task<ResponseDTO> GetUserByEmail(string email);
    }
}
