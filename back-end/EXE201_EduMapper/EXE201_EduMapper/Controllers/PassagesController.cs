using BLL.IService;
using BLL.Service;
using Common.DTO;
using Common.DTO.Passage;
using Common.DTO.Question;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EXE201_EduMapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassagesController : ControllerBase
    {
        private readonly IPassageService _passageService;

        public PassagesController(IPassageService passageService)
        {
            _passageService = passageService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetAllPassages([FromQuery] QueryDTO request)
        {
            var result = await _passageService.GetAllPassages(request);
            
            return Ok(result);
        }

        [HttpGet("id/{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(404, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetById(string id)
        {
            var passages = await _passageService.GetPassageById(id);

            return Ok(passages);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public IActionResult CreateNewQuestion([FromBody] PassageCreateDTO passageDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = _passageService.CreatePassage(passageDTO);

            if (result.IsSuccess)
            {
                return Created(uri: "", value: result);
            }
            else
            {
                return BadRequest(result);
            }
        }
    }
}
