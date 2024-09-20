using BLL.IService;
using Common.Constant.Message;
using Common.Constant.Message.MemberShip;
using Common.DTO;
using Common.DTO.MemberShip;
using Common.Enum;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> GetMemberships([FromQuery] QueryDTO request)
        {
            var result = await _membershipService.GetAllMemberShips(request);

            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(404, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetMemberShip(string id)
        {
            var response = await _membershipService.GetMemberShip(id);

            return Ok(response);
        }

        [HttpPost]
        //[Authorize]
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

            var location = Url.Action("GetMemberShip", new { id = response.MemberShipId });

            return Created(uri: location, value: new ResponseDTO
            {
                StatusCode = StatusCodeEnum.Created,
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                MetaData = response
            });
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateMemberShip(string id, [FromBody] MemberShipUpdateDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    Message = ModelState.ToString()!,
                    StatusCode = StatusCodeEnum.BadRequest
                });
            }

            await _membershipService.UpdateMemberShip(id, request);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteMemberShip(string id)
        {
            await _membershipService.DeleteMemberShip(id);

            return NoContent();
        }
    }
}
