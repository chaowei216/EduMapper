using BLL.IService;
using Common.Constant.Payment;
using Common.DTO;
using Common.Enum.Auth;
using DAL.Models;
using DAL.UnitOfWork;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Service
{
    public class StatisticService : IStatisticService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITransactionService _transactionService;

        public StatisticService(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, ITransactionService transactionService)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _transactionService = transactionService;
        }

        public async Task<StatisticSystemDTO> GetStatisticOfSystem()
        {
            var systemInfo = new StatisticSystemDTO();

            var teacher = await _userManager.GetUsersInRoleAsync(RoleEnum.TEACHER.ToString());
            var customer = await _userManager.GetUsersInRoleAsync(RoleEnum.CUSTOMER.ToString());

            systemInfo.Teacher = teacher.Count();
            systemInfo.Customer = customer.Count();

            var transactions = await _transactionService.GetAllPaidTransactions();
            systemInfo.Transaction = transactions.Count();

            var trans = await _unitOfWork.TransactionRepository.Get(filter: c => c.Status == PaymentConst.PaidStatus);
            var sum = trans.Sum(p => p.Amount);

            systemInfo.Revenue = sum;
            return systemInfo;
        }
    }
}
