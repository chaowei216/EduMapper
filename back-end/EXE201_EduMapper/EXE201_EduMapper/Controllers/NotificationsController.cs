using BLL.Exceptions;
using BLL.IService;
using BLL.Service;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Notification;
using Common.DTO.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EXE201_EduMapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        private readonly IUserService _userService;

        public NotificationsController(INotificationService notificationService, 
                                       IUserService userService)
        {
            _notificationService = notificationService;
            _userService = userService;

        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [Authorize]
        public async Task<IActionResult> GetNotificationsOfUser(string userId, [FromQuery] NotificationParameters parameters)
        {
            var user = await _userService.GetUserById(userId);

            if (user == null)
                throw new NotFoundException(GeneralMessage.NotFound);

            var response = await _notificationService.GetNotificationsOfUser(userId, parameters);

            return Ok(response);
        }

        [HttpGet("system")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [Authorize]
        public async Task<IActionResult> GetSystemNotifications([FromQuery] NotificationParameters parameters)
        {
            var response = await _notificationService.GetSystemNotifications(parameters);

            return Ok(response);
        }

        [HttpPost("system")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [Authorize]
        public IActionResult CreateSystemNotification([FromBody] NotificationCreateDTO request)
        {
            var response = _notificationService.AddSystemNotification(request);

            return Created("", response);
        }
    }
}
