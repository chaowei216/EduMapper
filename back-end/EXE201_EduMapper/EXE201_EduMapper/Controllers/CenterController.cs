using BLL.IService;
using Common.DTO;
using Common.DTO.Query;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EXE201_EduMapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CenterController : ControllerBase
    {
        private readonly ICenterService _centerService;
        public CenterController(ICenterService centerService)
        {
            _centerService = centerService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetAllCenters([FromQuery] CenterParameters request)
        {
            var result = await _centerService.GetAllCenters(request);

            return Ok(result);
        }

        [HttpGet("id/{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(404, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetById(string id)
        {
            var center = await _centerService.GetCenterById(id);

            return Ok(center);
        }
    }
}
