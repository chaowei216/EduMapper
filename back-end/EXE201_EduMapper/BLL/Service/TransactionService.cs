using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Transaction;
using Common.Enum;
using DAL.UnitOfWork;
using DAO.Models;

namespace BLL.Service
{
    public class TransactionService : ITransactionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TransactionService(IUnitOfWork unitOfWork,
                                  IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public void AddNewTransaction(Transaction transaction)
        {
            _unitOfWork.TransactionRepository.Insert(transaction);
        }

        public async Task<IEnumerable<Transaction>> GetAllPaidTransactions()
        {
            return await _unitOfWork.TransactionRepository.GetPaidTransactions();
        }

        public async Task<ResponseDTO> GetAllTransactions(TransactionParameters parameters)
        {
            var transactions = await _unitOfWork.TransactionRepository.GetTransactionsPagedList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<TransactionDTO>>(transactions);
            mappedResponse.Data = _mapper.Map<List<TransactionDTO>>(transactions);

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                StatusCode = StatusCodeEnum.OK,
                MetaData = mappedResponse
            };
        }

        public async Task<Transaction?> GetUnpaidTransOfUser(string userId)
        {
            return await _unitOfWork.TransactionRepository.GetUnPaidTransactionOfUser(userId);
        }

        public async Task<IEnumerable<Transaction>> GetPaidTransOfUser(string userId)
        {
            return await _unitOfWork.TransactionRepository.GetPaidTransactionsOfUser(userId);
        }

        public async Task<ResponseDTO> GetTransOfUser(string userId, TransactionParameters parameters)
        {
            var transactions = await _unitOfWork.TransactionRepository.GetTransOfUser(userId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<TransactionDTO>>(transactions);
            mappedResponse.Data = _mapper.Map<List<TransactionDTO>>(transactions);

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                StatusCode = StatusCodeEnum.OK,
                MetaData = mappedResponse
            };
        }

        public async Task<bool> UpdateTransaction(string tranId, Transaction transaction)
        {
            return await _unitOfWork.TransactionRepository.Update(tranId, transaction);
        }
    }
}
