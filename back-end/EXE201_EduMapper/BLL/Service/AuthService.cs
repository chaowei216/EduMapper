using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant;
using Common.Constant.Message;
using Common.Constant.Message.Auth;
using Common.Constant.Message.Email;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.User;
using Common.Enum;
using Common.Enum.Auth;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace BLL.Service
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthService(UserManager<ApplicationUser> userManager,
                           ITokenService tokenService,
                           IEmailService emailService,
                           IConfiguration configuration,
                           IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _emailService = emailService;
            _configuration = configuration;
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

        public async Task<ResponseDTO> ConfirmEmail(ConfirmEmailDTO request)
        {
            // check if user is existed
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new NotFoundException(LoginMessage.NotExistedUser);
            }

            var result = await _userManager.ConfirmEmailAsync(user, request.Token);

            if (!result.Succeeded)
            {
                // handle if not success
                var errors = string.Join(Environment.NewLine, result.Errors.Select(e => e.Description));
                throw new BadRequestException(errors);
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.UpdateSuccess,
                StatusCode = StatusCodeEnum.OK
            };
        }

        public async Task<ResponseDTO> ForgotPassword(ForgotPasswordDTO request)
        {
            // check if user is existed
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new NotFoundException(LoginMessage.NotExistedUser);
            }

            // generate token
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            _emailService.SendOTPEmail(user.Email!, token, EmailMessage.ForgotPasswordSubject);

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created
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

        public async Task<ResponseDTO> LoginExternalParties(string type, ExternalLoginDTO request)
        {
            // check type
            if (Enum.GetNames(typeof(ExternalParty)).Length < 0
                || !Enum.GetNames(typeof(ExternalParty)).Contains(type.ToUpper()))
            {
                throw new BadRequestException(LoginMessage.NotSupportedSite);
            }

            // check if user is existed in system
            var user = await _userManager.FindByEmailAsync(request.Email);

            // user is not existed
            if (user == null)
            {
                user = _mapper.Map<ApplicationUser>(request);
                user.Status = (int)UserStatusEnum.ACTIVE;
                user.UserName = request.Email;
                user.EmailConfirmed = true;

                var result = await _userManager.CreateAsync(user, Config.DefaultPassword);

                if (!result.Succeeded)
                {
                    // handle if not success
                    var errors = string.Join(Environment.NewLine, result.Errors.Select(e => e.Description));
                    throw new BadRequestException(errors);
                }

                // send email password

                // if success
                // add role for user
                await _userManager.AddToRoleAsync(user, RoleEnum.CUSTOMER.ToString());
            }

            // check if user's email is confirmed
            if (!user.EmailConfirmed)
            {
                // link to external parties email (update email confirmed)
                user.EmailConfirmed = true;
                await _userManager.UpdateAsync(user);
            }

            // return new token pair to user
            // create token pair
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

        public async Task<ResponseDTO> LoginNormal(LoginNormalRequestDTO request)
        {
            // check if user is admin
            var user = CheckAdminAccount(request.Email, request.Password);

            if (user == null)
            {
                // not admin
                // check existed email
                user = await _userManager.FindByEmailAsync(request.Email);

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

        public async Task<ResponseDTO> ResetPassword(ResetPasswordDTO request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new NotFoundException(LoginMessage.NotExistedUser);
            }

            var result = await _userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);

            if (!result.Succeeded)
            {
                // handle if not success
                var errors = string.Join(Environment.NewLine, result.Errors.Select(e => e.Description));
                throw new BadRequestException(errors);
            }

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.UpdateSuccess
            };
        }

        public async Task<ResponseDTO> VerifyEmail(VerifyEmailDTO request)
        {
            // check if user is existed
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new NotFoundException(LoginMessage.NotExistedUser);
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            _emailService.SendOTPEmail(user.Email!, token, EmailMessage.VerifyEmailSubject);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.Created,
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess
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

        private ApplicationUser? CheckAdminAccount(string email, string password)
        {
            var adminEmail = _configuration["AdminAccount:Email"];
            var adminPassword = _configuration["AdminAccount:Password"];

            if (!string.IsNullOrEmpty(adminEmail) && !string.IsNullOrEmpty(adminPassword))
            {
                if (adminEmail == email && adminPassword == password)
                {
                    return new ApplicationUser
                    {
                        Email = adminEmail,  
                        FullName = Config.AdminName
                    };
                }
            }

            return null;
        }
    }
}
