using BLL.IService;
using Common.Constant.Message.MemberShip;
using Common.DTO;
using Common.DTO.MemberShip;
using Common.Enum;
using Microsoft.AspNetCore.Mvc;

namespace EXE201_EduMapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberShipsController : ControllerBase
    {
        private readonly IMembershipService _membershipService;

        public MemberShipsController(IMembershipService membershipService)
        {
            _membershipService = membershipService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public IActionResult GetMemberships([FromQuery] QueryDTO request)
        {
            var result = _membershipService.GetAllMemberShips(request);

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public IActionResult CreateMemberShip([FromBody] MemberShipCreateDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    Message = ModelState.ToString()!,
                    StatusCode = StatusCodeEnum.BadRequest
                });
            }

            if (!_membershipService.CheckUniqueMemberShipName(request.MemberShipName))
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = MemberShipMessage.ExistedName
                });
            }

            var response = _membershipService.CreateMemberShip(request);
            return Created(uri: string.Empty, value: response);
        }
    }
}
