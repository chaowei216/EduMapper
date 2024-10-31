using BLL.IService;
using Common.DTO.Payment.PayOS;
using Microsoft.Extensions.Options;
using Net.payOS;
using Net.payOS.Constants;
using Net.payOS.Types;

namespace BLL.Service
{
    public class PayOSService : IPayOSService
    {
        private readonly PaymentConfig _config;
        private readonly PayOS _payOS;

        public PayOSService(IOptions<PaymentConfig> config)
        {
            _config = config.Value;
            _payOS = new PayOS(_config.ClientID, _config.ApiKey, _config.CheckSumKey);
        }

        public async Task<PaymentLinkInformation> CancelPaymentLink(long orderCode)
        {
            PaymentLinkInformation cancelledPaymentLinkInfo = await _payOS.cancelPaymentLink(orderCode);

            return cancelledPaymentLinkInfo;
        }

        public async Task<CreatePaymentResult> CreatePaymentLink(PayOSRequestDTO request)
        {
            int orderCode = int.Parse(DateTimeOffset.Now.ToString("ffffff"));
            ItemData item = new ItemData(request.MemberShipName, 1, request.TotalPrice);
            List<ItemData> items = new List<ItemData>();
            items.Add(item);
            PaymentData paymentData = new PaymentData(orderCode, request.TotalPrice,
                request.Description, items,
                request.cancelUrl, request.returnUrl);

            CreatePaymentResult createPayment = await _payOS.createPaymentLink(paymentData);

            return createPayment;
        }
    }
}
