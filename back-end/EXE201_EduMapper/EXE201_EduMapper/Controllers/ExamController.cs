﻿using BLL.IService;
using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Progress;
using Common.DTO.Query;
using Common.DTO.Test;
using Common.DTO.UserAnswer;
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
        public async Task<IActionResult> GetAllExams([FromQuery] ExamParameters request)
        {
            var result = await _examService.GetAllExams(request);

            return Ok(result);
        }

        [HttpGet("user-writing-answer")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetWritingAnswerById([FromQuery] GetFinishDTO request)
        {
            var result = await _examService.GetWritingAnswerById(request);

            return Ok(result);
        }

        [HttpGet("speaking-request")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetAllSpeakingRequest([FromQuery] ExamParameters request)
        {
            var result = await _examService.GetSpeakingRequest(request);

            return Ok(result);
        }

        [HttpGet("writing-answer")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetAllWriting([FromQuery] ExamParameters request)
        {
            var result = await _examService.GetWritingAnswer(request);

            return Ok(result);
        }

        [HttpGet("writing-exam-answer")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetAllWritingExamAnswer([FromQuery] ExamParameters request)
        {
            var result = await _examService.GetWritingExamAnswer(request);

            return Ok(result);
        }

        [HttpGet("user-answers")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetUserAnswer([FromQuery] GetFinishDTO request)
        {
            var result = await _examService.GetUserAnswer(request);

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

        [HttpPut("score-writing")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> ScoreWriting([FromBody] ScoreWritingDTO examDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _examService.ScoreWritingExam(examDTO);

            if (result.IsSuccess)
            {
                return Created(uri: "", value: result);
            }
            else
            {
                return BadRequest(result);
            }
        }

        [HttpPut("score-reading")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> ScoreReading([FromBody] ScoreReadingExam examDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _examService.ScoreReadingExam(examDTO);

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

        [HttpPost("answer-writing")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> AnswerWritingQuestion([FromBody] AnswerWritingDTO examDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _examService.AnswerWritingQuestion(examDTO);

            if (result.IsSuccess)
            {
                return Created(uri: "", value: result);
            }
            else
            {
                return BadRequest(result);
            }
        }


        [HttpPost("speaking-email")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> AnswerQuestion([FromBody] ScheduleSpeakingDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _examService.SendSpeakingEmail(request);

            if (result.IsSuccess)
            {
                return Created(uri: "", value: result);
            }
            else
            {
                return BadRequest(result);
            }
        }

        [HttpPost("request-speaking")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> RequestSpeaking([FromBody] RequestSpeakingDTO progressDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _examService.RequestSpeakingExam(progressDTO);

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

        [HttpPut("submit-test")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> SubmitTest([FromBody] SubmitExamDTO exam)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    Message = ModelState.ToString()!,
                    StatusCode = StatusCodeEnum.BadRequest
                });
            }

            var result = await _examService.SubmitAnswer(exam);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return NoContent();
        }
    }
}
