using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Transaction;
using DAO.Models;

namespace BLL.IService
{
    public interface ITransactionService
    {
        /// <summary>
        /// Get all transactions
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetAllTransactions(TransactionParameters parameters);

        /// <summary>
        /// Add new transaction
        /// </summary>
        /// <param name="transaction"></param>
        /// <returns></returns>
        void AddNewTransaction(Transaction transaction);

        /// <summary>
        /// Update transaction
        /// </summary>
        /// <param name="tranId"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        Task<bool> UpdateTransaction(string tranId, Transaction transaction);

        /// <summary>
        /// Get last unpaid trans of user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<Transaction?> GetUnpaidTransOfUser(string userId);

        /// <summary>
        /// Get trans of user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetTransOfUser(string userId, TransactionParameters parameters);

        /// <summary>
        /// Get all paid transaction of user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<IEnumerable<Transaction>> GetPaidTransOfUser(string userId);

        /// <summary>
        /// Get all paid transactions
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<Transaction>> GetAllPaidTransactions();
    }
}
