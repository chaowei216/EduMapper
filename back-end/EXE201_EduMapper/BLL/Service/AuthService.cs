using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.Constant.Message.Auth;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.User;
using Common.Enum;
using Common.Enum.Auth;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace BLL.Service
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthService(UserManager<ApplicationUser> userManager,
                           ITokenService tokenService,
                           IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public async Task<ResponseDTO> ChangePassword(string token, ChangePasswordDTO request)
        {
            var tokenInfo = _tokenService.GetAccessTokenData(token);

            if (tokenInfo == null
                || string.IsNullOrEmpty(tokenInfo.UserId))
            {
                throw new BadRequestException(TokenMessage.InValidToken);
            }

            var user = await _userManager.FindByIdAsync(tokenInfo.UserId);

            if (user == null)
            {
                throw new NotFoundException(LoginMessage.NotExistedUser);
            }

            var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

            if (!result.Succeeded)
            {
                // handle if not success
                var errors = string.Join(Environment.NewLine, result.Errors.Select(e => e.Description));
                throw new BadRequestException(errors);
            }

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.NoContent,
                IsSuccess = true,
                Message = GeneralMessage.UpdateSuccess
            };
        }

        public async Task<ResponseDTO> GetUserByToken(string token)
        {
            var userId = ExtractUserIdFromToken(token);

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnAuthorizedException(GeneralMessage.UnAuthorized);
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            var mappedUser = _mapper.Map<UserAuthDTO>(user);
            mappedUser.ImageLinked = !string.IsNullOrEmpty(user.ImageLink);
            mappedUser.Avatar = !string.IsNullOrEmpty(user.Avatar) ? user.Avatar : user.ImageLink;

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                StatusCode = StatusCodeEnum.OK,
                MetaData = mappedUser
            };
        }

        public async Task<ResponseDTO> LoginNormal(LoginNormalRequestDTO request)
        {
            // check existed email
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new UnAuthorizedException(LoginMessage.NotExistedUser);
            }

            // check password
            var isMatchedPassword = await _userManager.CheckPasswordAsync(user, request.Password);

            if (!isMatchedPassword)
            {
                throw new UnAuthorizedException(LoginMessage.LoginFail);
            }

            // create token pairs
            var tokenPairs = await _tokenService.CreateTokenPair(user);

            var mappedUser = _mapper.Map<UserAuthDTO>(user);
            mappedUser.ImageLinked = !string.IsNullOrEmpty(user.ImageLink);
            mappedUser.Avatar = !string.IsNullOrEmpty(user.Avatar) ? user.Avatar : user.ImageLink;

            var response = new LoginResponseDTO
            {
                User = mappedUser,
                AccessToken = tokenPairs.AccessToken,
                RefreshToken = tokenPairs.RefreshToken
            };

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = LoginMessage.LoginSuccess,
                MetaData = response,
                StatusCode = StatusCodeEnum.OK
            };
        }

        public ResponseDTO Logout(string refreshToken)
        {
            _tokenService.RevokeToken(refreshToken);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.UpdateSuccess
            };
        }

        public async Task<ResponseDTO> RefreshTokenPair(TokenDTO tokens)
        {
            var newTokenPair = await _tokenService.RefreshTokenPair(tokens);

            if (newTokenPair == null
                || string.IsNullOrEmpty(newTokenPair.AccessToken)
                || string.IsNullOrEmpty(newTokenPair.RefreshToken))
            {
                return new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.UnAuthorized,
                    Message = GeneralMessage.UnAuthorized
                };
            }

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.Created,
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                MetaData = newTokenPair
            };
        }

        public async Task<ResponseDTO> Register(RegisterRequestDTO request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            // check if email is existed in system
            if (user != null)
            {
                throw new BadRequestException(RegisterMessage.EmailAlreadyExists);
            }

            // map user to domain object
            var mappedUser = _mapper.Map<ApplicationUser>(request);
            mappedUser.UserName = request.Email;
            mappedUser.Status = (int)UserStatusEnum.ACTIVE;

            // create
            var result = await _userManager.CreateAsync(mappedUser, request.Password);

            // if fail
            if (!result.Succeeded)
            {
                // handle if not success
                var errors = string.Join(Environment.NewLine, result.Errors.Select(e => e.Description));
                throw new BadRequestException(errors);
            }

            // if success
            // add role for user
            await _userManager.AddToRoleAsync(mappedUser, RoleEnum.CUSTOMER.ToString());

            var responseUser = _mapper.Map<UserAuthDTO>(user);
            responseUser.ImageLinked = !string.IsNullOrEmpty(user.ImageLink);
            responseUser.Avatar = !string.IsNullOrEmpty(user.Avatar) ? user.Avatar : user.ImageLink;

            return new ResponseDTO
            {
                IsSuccess = true,
                StatusCode = StatusCodeEnum.Created,
                Message = RegisterMessage.RegisterSuccess,
                MetaData = responseUser
            };
        }

        private string ExtractUserIdFromToken(string accessToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(accessToken);
            
            //  take userId in claim of token
            string userId = jwtToken.Subject;
            return userId;
        }
    }
}
