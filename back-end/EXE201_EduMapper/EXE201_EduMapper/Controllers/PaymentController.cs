﻿using BLL.IService;
using Common.DTO;
using Common.DTO.Payment;
using Common.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EXE201_EduMapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("vnpay")]
        [ProducesResponseType(201, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        [ProducesResponseType(401, Type = typeof(ResponseDTO))]
        [Authorize]
        public async Task<IActionResult> CreateRequestUrl([FromBody] PaymentRequestDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    Message = ModelState.ToString()!,
                    StatusCode = StatusCodeEnum.BadRequest
                });
            }

            var response = await _paymentService.CreatePaymentRequest(request, HttpContext);

            return Created("", response);
        }

        [HttpPost("vnpay/handle-response")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [ProducesResponseType(400, Type = typeof(ResponseDTO))]
        [ProducesResponseType(401, Type = typeof(ResponseDTO))]
        [Authorize]
        public async Task<IActionResult> HandleResponse([FromBody] PaymentResponseDTO responseInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO
                {
                    Message = ModelState.ToString()!,
                    StatusCode = StatusCodeEnum.BadRequest
                });
            }

            var response = await _paymentService.HandlePaymentResponse(responseInfo);

            return Ok(response);
        }
    }
}