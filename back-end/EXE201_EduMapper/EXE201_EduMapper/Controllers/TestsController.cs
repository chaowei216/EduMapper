using BLL.IService;
using BLL.Service;
using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Test;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EXE201_EduMapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestsController : ControllerBase
    {
        private readonly ITestService _testService;

        public TestsController(ITestService testService)
        {
            _testService = testService;
        }

        [HttpGet("{id}/reading")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(404, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetReadingTestByTestId(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var tests = await _testService.GetReadingTestById(id);

            return Ok(tests);
        }

        [HttpGet("{id}/listening")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(404, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetListeningTestById(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var tests = await _testService.GetListeningTestById(id);

            return Ok(tests);
        }

        [HttpGet("{id}/writing")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(404, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetWritingTestById(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var tests = await _testService.GetWritingTestById(id);

            return Ok(tests);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> CreateNewTest([FromBody] TestCreateDTO testDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _testService.CreateTest(testDTO);

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
