using BLL.IService;
using Common.DTO;
using Common.DTO.Question;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EXE201_EduMapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService _questionService;

        public QuestionsController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet("id/{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(404, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetById(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var questions = await _questionService.GetQuestionById(id);

            return Ok(questions);
        }

        [HttpPost("create")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        [ProducesResponseType(401, Type = typeof(ResponseDTO))]
        public IActionResult CreateNewQuestion([FromBody] CreateQuestionDTO questionDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = _questionService.CreateQuestion(questionDTO);

            if(result.IsSuccess)
            {
                return Ok(result);
            } else
            {
                return BadRequest(result);
            }
        }
    }
}
