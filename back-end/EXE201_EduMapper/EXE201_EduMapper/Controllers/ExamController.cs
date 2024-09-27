using BLL.IService;
using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Progress;
using Common.DTO.Test;
using Common.Enum;
using Microsoft.AspNetCore.Mvc;

namespace EXE201_EduMapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly IExamService _examService;

        public ExamController(IExamService examService)
        {
            _examService = examService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetAllExams([FromQuery] QueryDTO request)
        {
            var result = await _examService.GetAllExams(request);

            return Ok(result);
        }

        [HttpGet("id/{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(404, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetById(string id)
        {
            var exams = await _examService.GetExamById(id);

            return Ok(exams);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public async Task<IActionResult>CreateNewExam([FromBody] ExamCreateDTO examDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _examService.CreateExam(examDTO);

            if (result.IsSuccess)
            {
                return Created(uri: "", value: result);
            }
            else
            {
                return BadRequest(result);
            }
        }

        [HttpPost("answer")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> AnswerQuestion([FromBody] AnswerDTO examDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _examService.AnswerQuestion(examDTO);

            if (result.IsSuccess)
            {
                return Created(uri: "", value: result);
            }
            else
            {
                return BadRequest(result);
            }
        }

        [HttpPost("start-exam")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> StartExam([FromBody] ProgressCreateDTO progressDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _examService.StartExam(progressDTO);

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
