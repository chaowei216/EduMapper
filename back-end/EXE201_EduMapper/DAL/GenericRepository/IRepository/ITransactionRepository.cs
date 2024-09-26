using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Transaction;
using DAL.Repository;
using DAO.Models;

namespace DAL.GenericRepository.IRepository
{
    public interface ITransactionRepository : IGenericRepository<Transaction>
    {
        /// <summary>
        /// Get unpaid trans of user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<Transaction?> GetUnPaidTransactionOfUser(string userId);

        /// <summary>
        /// Get paid transactions
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<Transaction>> GetPaidTransactions();

        /// <summary>
        /// Get paid transactions of user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<IEnumerable<Transaction>> GetPaidTransactionsOfUser(string userId);

        /// <summary>
        /// get all trans with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task<PagedList<Transaction>> GetTransactionsPagedList(TransactionParameters parameters);

        /// <summary>
        /// get trans of user with pagination
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task<PagedList<Transaction>> GetTransOfUser(string userId, TransactionParameters parameters);
    }
}
