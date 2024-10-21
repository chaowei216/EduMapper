using Common.Constant.Payment;
using Common.DTO;
using Common.DTO.Query;
using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Repository;
using DAO.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.GenericRepository.Repository
{
    public class TransactionRepository : GenericRepository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(DataContext context) : base(context) { }

        public async Task<IEnumerable<Transaction>> GetPaidTransactions()
        {
            return await _context.Transactions.Where(t => t.Status == PaymentConst.PaidStatus).ToListAsync();
        }

        public async Task<PagedList<Transaction>> GetTransactionsPagedList(TransactionParameters parameters)
        {
            var trans = _context.Transactions.Include(t => t.User).Include(t => t.MemberShip).Where(t => t.Status != PaymentConst.CancelStatus);

            if (parameters.Status != null)
            {
                trans = trans.Where(u => u.Status.ToLower() == parameters.Status.ToLower());
            }

            return await PagedList<Transaction>.ToPagedList(trans.OrderByDescending(p => p.TransactionDate), parameters.PageNumber, parameters.PageSize);
        }

        public async Task<Transaction?> GetUnPaidTransactionOfUser(string userId)
        {
            return await _context.Transactions.FirstOrDefaultAsync(t => t.UserId == userId && t.Status == PaymentConst.PendingStatus);
        }

        public async Task<IEnumerable<Transaction>> GetPaidTransactionsOfUser(string userId)
        {
            return await _context.Transactions.Where(t => t.UserId == userId && t.Status == PaymentConst.PaidStatus).ToListAsync();
        }

        public async Task<PagedList<Transaction>> GetTransOfUser(string userId, TransactionParameters parameters)
        {
            var trans = _context.Transactions.Include(t => t.User).Include(t => t.MemberShip).Where(t => t.UserId == userId && t.Status != PaymentConst.CancelStatus);

            if (parameters.Status != null)
            {
                trans = trans.Where(u => u.Status.ToLower() == parameters.Status.ToLower());
            }

            return await PagedList<Transaction>.ToPagedList(trans.OrderByDescending(p => p.TransactionDate), parameters.PageNumber, parameters.PageSize);
        }
    }
}
