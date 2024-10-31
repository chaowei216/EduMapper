using Common.DTO.Payment.PayOS;
using DAO.Models;
using Net.payOS.Types;

namespace BLL.IService
{
    public interface IPayOSService
    {
        /// <summary>
        /// Create new payment payos link
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<CreatePaymentResult> CreatePaymentLink(PayOSRequestDTO request);

        /// <summary>
        /// Cancel payment link
        /// </summary>
        /// <param name="orderCode"></param>
        /// <returns></returns>
        Task<PaymentLinkInformation> CancelPaymentLink(long orderCode);
    }
}
