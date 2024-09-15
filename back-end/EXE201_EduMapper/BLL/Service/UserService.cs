using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant;
using Common.Constant.Message;
using Common.Constant.Message.Auth;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.User;
using Common.Enum;
using DAL.Models;
using Microsoft.AspNetCore.Identity;

namespace BLL.Service
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager,
                           IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<ResponseDTO> GetUserByEmail(string email)
        {
            // find user
            var user = await _userManager.FindByEmailAsync(email);

            // check
            if (user == null)
            {
                throw new NotFoundException(LoginMessage.NotExistedUser);
            }

            // map entity to dto
            var mappedUser = _mapper.Map<UserAuthDTO>(user);
            mappedUser.ImageLinked = !string.IsNullOrEmpty(user.ImageLink);
            mappedUser.Avatar = !string.IsNullOrEmpty(user.Avatar) ? user.Avatar : user.ImageLink;
            var roleList = await _userManager.GetRolesAsync(user);
            mappedUser.RoleName = roleList.Count == 0 ? Config.AdminName : roleList[0];

            // return
            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedUser
            };
        }
    }
}
