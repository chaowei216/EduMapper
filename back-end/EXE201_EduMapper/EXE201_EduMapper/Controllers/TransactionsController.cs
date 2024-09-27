using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EXE201_EduMapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly IUserService _userService;

        public TransactionsController(ITransactionService transactionService,
                                      IUserService userService)
        {
            _transactionService = transactionService;
            _userService = userService;

        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [Authorize]
        public async Task<IActionResult> GetAllTransactions([FromQuery] TransactionParameters parameters)
        {
            var response = await _transactionService.GetAllTransactions(parameters);

            return Ok(response);
        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(200, Type = typeof(ResponseDTO))]
        [Authorize]
        public async Task<IActionResult> GetTransactionsOfUser(string userId, [FromQuery] TransactionParameters parameters)
        {
            var user = await _userService.GetUserById(userId);

            if (user == null)
                throw new NotFoundException(GeneralMessage.NotFound);

            var response = await _transactionService.GetTransOfUser(userId, parameters); 
            
            return Ok(response);
        }
    }
}
