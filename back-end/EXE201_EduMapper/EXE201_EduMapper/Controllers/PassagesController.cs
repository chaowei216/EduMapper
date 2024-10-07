using BLL.IService;
using BLL.Service;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Passage;
using Common.DTO.Query;
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
        public async Task<IActionResult> GetAllPassages([FromQuery] PassageParameters request)
        {
            var result = await _passageService.GetAllPassages(request);
            
            return Ok(result);
        }

        [HttpGet("ielts")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetAllIELTSPassages([FromQuery] PassageParameters request)
        {
            var result = await _passageService.GetIELTSPassage(request);

            return Ok(result);
        }

        [HttpGet("except-ielts")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> GetExceptIELTSPassages([FromQuery] PassageParameters request)
        {
            var result = await _passageService.GetExceptIELTSPassage(request);

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

        [HttpPost("ielts")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public IActionResult CreateNewIELTSPassage([FromBody] PassageIELTSCreateDTO passageDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = _passageService.CreateIELTSPassage(passageDTO);

            if (result.IsSuccess)
            {
                return Created(uri: "", value: result);
            }
            else
            {
                return BadRequest(result);
            }
        }

        [HttpPost("listening")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public async Task<IActionResult> CreateListeningPassage([FromForm] PassageCreateDTO passageDTO, IFormFile? file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!
                });
            }

            var result = await _passageService.CreateListeningPassage(passageDTO, file);

            if (result.IsSuccess)
            {
                return Created(uri: "", value: result);
            }
            else
            {
                return BadRequest(result);
            }
        }

        [HttpPost("except-ielts")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        public IActionResult CreateNewPassage([FromBody] PassageCreateDTO passageDTO)
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

        [HttpGet("files")]
        public async Task<IActionResult> GetFile(string fileName)
        {
            try
            {
                var fileStream = await _passageService.RetrieveItemAsync(fileName);
                var fileExtension = Path.GetExtension(fileName);
                string mimeType;
                switch (fileExtension.ToLower())
                {
                    case ".jpg":
                    case ".jpeg":
                        mimeType = "image/jpeg";
                        break;
                    case ".png":
                        mimeType = "image/png";
                        break;
                    case ".gif":
                        mimeType = "image/gif";
                        break;
                    case ".bmp":
                        mimeType = "image/bmp";
                        break;
                    case ".mp3":
                        mimeType = "audio/mpeg"; // MIME type cho tệp MP3
                        break;
                    default:
                        mimeType = "application/octet-stream"; // Fallback to a generic MIME type
                        break;
                }
                if (fileStream == null)
                {
                    return BadRequest(new ResponseDTO()
                    {
                        StatusCode = StatusCodeEnum.NotFound,
                        Message = GeneralMessage.NotFound,
                    });
                }

                return File(fileStream, mimeType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = StatusCodeEnum.InteralServerError,
                    Message = ex.Message,
                    MetaData = null
                });
            }
        }


        [HttpPut("add-to-passage")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> AddQuestionToPassage([FromBody] AddQuestionDTO question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    Message = ModelState.ToString()!,
                    StatusCode = StatusCodeEnum.BadRequest
                });
            }

            var result = await _passageService.AddQuestionToPassage(question);

            if(!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return NoContent();
        }
    }
}
