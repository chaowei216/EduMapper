using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.Constant.Message.Auth;
using Common.DTO;
using Common.DTO.User;
using Common.Enum;
using DAL.Models;
using Microsoft.AspNetCore.Identity;

namespace BLL.Service
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;

        public UserService(UserManager<ApplicationUser> userManager,
                           ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }
    }
}
