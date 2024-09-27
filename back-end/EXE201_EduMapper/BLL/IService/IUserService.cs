using Common.DTO;
using Common.DTO.User;
using DAL.Models;

namespace BLL.IService
{
    public interface IUserService
    {
        /// <summary>
        /// Get user by email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetUserByEmail(string email);

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ApplicationUser?> GetUserById(string id);
    }
}
