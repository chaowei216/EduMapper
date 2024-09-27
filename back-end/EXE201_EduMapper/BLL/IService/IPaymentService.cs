using Common.DTO;
using Common.DTO.Payment;
using Microsoft.AspNetCore.Http;

namespace BLL.IService
{
    public interface IPaymentService
    {
        /// <summary>
        /// Create payment request
        /// </summary>
        /// <param name="paymentInfo"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        Task<ResponseDTO> CreatePaymentRequest(PaymentRequestDTO paymentInfo, HttpContext context);

        /// <summary>
        /// Handle payment response from payment method
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        Task<ResponseDTO> HandlePaymentResponse(PaymentResponseDTO response);
    }
}
