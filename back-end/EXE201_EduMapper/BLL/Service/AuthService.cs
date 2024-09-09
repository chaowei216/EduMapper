using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message.Auth;
using Common.DTO;
using Common.DTO.Auth;
using Common.Enum;
using DAL.Models;
using Microsoft.AspNetCore.Identity;

namespace BLL.Service
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<ResponseDTO> LoginNormal(LoginNormalRequestDTO request)
        {
            // check existed email
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new NotFoundException(LoginMessage.NotExistedUser);
            }

            // check password
            var isMatchedPassword = await _userManager.CheckPasswordAsync(user, request.Password);

            if (!isMatchedPassword)
            {
                throw new UnAuthorizedException(LoginMessage.LoginFail);
            }

            // create token pairs

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = LoginMessage.LoginSuccess,
                MetaData = null,
                StatusCode = StatusCodeEnum.OK
            };
        }

        public Task<ResponseDTO> Register(RegisterRequestDTO request)
        {
            throw new NotImplementedException();
        }
    }
}
