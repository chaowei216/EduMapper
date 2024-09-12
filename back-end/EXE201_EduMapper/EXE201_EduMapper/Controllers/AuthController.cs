using BLL.IService;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.User;
using Common.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EXE201_EduMapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(401)]
        public async Task<IActionResult> Login(LoginNormalRequestDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.LoginNormal(request);

            return Ok(result);
        }

        [HttpPost("register")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _authService.Register(request);

            return Ok(result);
        }

        [HttpPost("logout")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [Authorize]
        public IActionResult Logout([FromBody] LogoutRequestDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = _authService.Logout(request.RefreshToken);

            return Ok(result);
        }

        [HttpGet("me")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [Authorize]
        public async Task<IActionResult> GetInfo()
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var response = await _authService.GetUserByToken(token);

            return Ok(response);
        }

        [HttpPost("refresh-token")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesDefaultResponseType(typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        [Authorize]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenPairDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var accessToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var response = await _authService.RefreshTokenPair(new TokenDTO
            {
                AccessToken = accessToken,
                RefreshToken = request.RefreshToken
            });

            return Ok(response);
        }

        [HttpPatch("change-password")]
        [ProducesResponseType(204, Type = typeof(ResponseDTO))]
        [ProducesDefaultResponseType(typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        [ProducesResponseType(404, Type = typeof(ResponseDTO))]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var accessToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var response = await _authService.ChangePassword(accessToken, request);

            return Ok(response);
        }
    }
}
