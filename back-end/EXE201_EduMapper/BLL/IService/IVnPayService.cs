using Common.DTO.Payment;
using DAL.Models;
using Microsoft.AspNetCore.Http;

namespace BLL.IService
{
    public interface IVnPayService
    {
        /// <summary>
        /// Craete request url to vnpay
        /// </summary>
        /// <param name="memberShip"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        string CreatePaymentUrl(MemberShip memberShip, HttpContext context);
    }
}
