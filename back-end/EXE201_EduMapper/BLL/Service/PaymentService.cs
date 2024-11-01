using BLL.Exceptions;
using BLL.IService;
using Common.Constant;
using Common.Constant.Message;
using Common.Constant.Message.MemberShip;
using Common.Constant.Notification;
using Common.Constant.Payment;
using Common.DTO;
using Common.DTO.Payment;
using Common.DTO.Payment.PayOS;
using Common.Enum;
using DAL.UnitOfWork;
using DAO.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace BLL.Service
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITransactionService _transactionService;
        private readonly IMembershipService _membershipService;
        private readonly INotificationService _notificationService;
        private readonly IVnPayService _vnpPayService;
        private readonly IUserService _userService;
        private readonly IPayOSService _payOSService;
        private readonly IConfiguration _configuration;

        public PaymentService(ITransactionService transactionService,
                              IVnPayService vnpPayService,
                              IMembershipService membershipService,
                              INotificationService notificationService,
                              IUnitOfWork unitOfWork,
                              IUserService userService,
                              IPayOSService payOSService,
                              IConfiguration configuration)
        {
            _transactionService = transactionService;
            _unitOfWork = unitOfWork;
            _vnpPayService = vnpPayService;
            _membershipService = membershipService;
            _notificationService = notificationService;
            _userService = userService;
            _payOSService = payOSService;
            _configuration = configuration;
        }

        public async Task<ResponseDTO> CreatePaymentRequest(PaymentRequestDTO paymentInfo, HttpContext context)
        {
            var unpaidTrans = await _transactionService.GetUnpaidTransOfUser(paymentInfo.UserId);

            var memberShip = await _membershipService.GetMemberShipById(paymentInfo.MemberShipId);

            if (memberShip == null)
            {
                throw new BadRequestException(GeneralMessage.BadRequest);
            }

            // check if user has already package
            var userMemberShips = await _unitOfWork.MemberShipDetailRepository.GetMemberShipOfUser(paymentInfo.UserId);

            var freePackage = await _unitOfWork.MemberShipRepository.GetMemberShipByName(Config.MEMBERSHIP_FREE);

            // if had
            if (userMemberShips.Where(p => freePackage != null ? p.MemberShipId != freePackage!.MemberShipId : true)
                .Any(p => p.MemberShipId == paymentInfo.MemberShipId && !p.IsFinished))
            {
                // check date
                var msList = userMemberShips.Where(p => freePackage != null ? p.MemberShipId != freePackage!.MemberShipId : true
                                                            && p.MemberShipId == paymentInfo.MemberShipId && !p.IsFinished);
                foreach (var ms in msList)
                {
                    if (ms.ExpiredDate < DateTime.Now)
                    {
                        await _membershipService.RevokeUserMemberShip(ms);
                    } else
                    {
                        throw new BadRequestException(MemberShipMessage.NotExpired);
                    }
                } 
            }

            if (unpaidTrans != null)
            {
                unpaidTrans.Status = PaymentConst.CancelStatus;
                await _transactionService.UpdateTransaction(unpaidTrans.TransactionId, unpaidTrans);
            }

            var newTran = new DAO.Models.Transaction()
            {
                TransactionId = Guid.NewGuid().ToString(),
                PaymentMethod = paymentInfo.PaymentMethod,
                TransactionDate = DateTime.Now,
                Amount = memberShip.Price,
                TransactionInfo = PaymentConst.UnSet,
                TransactionNumber = PaymentConst.UnSet,
                Status = PaymentConst.PendingStatus,
                UserId = paymentInfo.UserId,
                MemberShipId = memberShip.MemberShipId
            };

            _transactionService.AddNewTransaction(newTran);

            // save
            _unitOfWork.Save();

            // choose payment method
            object response;
            if (paymentInfo.PaymentMethod == PaymentConst.PAYOS)
            {
                response = await _payOSService.CreatePaymentLink(new PayOSRequestDTO
                {
                    MemberShipName = memberShip.MemberShipName,
                    Description = PaymentConst.PAYMENT_DESCRIPTION + memberShip.MemberShipName,
                    TotalPrice = (int)memberShip.Price,
                    returnUrl = _configuration["PaymentOSCallBack:ReturnUrl"]!,
                    cancelUrl = _configuration["PaymentOSCallBack:CancelUrl"]!
                });
            } else
            {
                response = _vnpPayService.CreatePaymentUrl(memberShip, context);
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created,
                MetaData = response
            };
        }

        public async Task<ResponseDTO> HandlePaymentResponse(PaymentResponseDTO response)
        {
            var user = await _userService.GetUserById(response.UserId);

            if (user == null)
                throw new NotFoundException(GeneralMessage.NotFound);

            var unpaidTrans = await _transactionService.GetUnpaidTransOfUser(response.UserId);

            if (unpaidTrans != null && unpaidTrans.Status == PaymentConst.PendingStatus)
            {
                string notifyDes = PaymentConst.PENDING;

                if (response.IsSuccess)
                {
                    // update trans
                    unpaidTrans.Status = PaymentConst.PaidStatus;
                    unpaidTrans.TransactionInfo = response.TransactionInfo;
                    unpaidTrans.TransactionNumber = response.TransactionNumber;

                    // update trans description
                    notifyDes = PaymentConst.SUCCESS;

                    // update member ship of user.
                    await _membershipService.AddMemberShipToUser(user, unpaidTrans.MemberShipId);
                }
                else
                {
                    // update trans
                    unpaidTrans.TransactionInfo = response.TransactionInfo;
                    unpaidTrans.TransactionNumber = response.TransactionNumber;
                    unpaidTrans.Status = PaymentConst.CancelStatus;

                    // cancel link
                    if (unpaidTrans.PaymentMethod == PaymentConst.PAYOS)
                    {
                        await _payOSService.CancelPaymentLink(long.Parse(response.TransactionNumber));
                    }

                    // update trans description
                    notifyDes = PaymentConst.FAIL;
                }

                await _transactionService.UpdateTransaction(unpaidTrans.TransactionId, unpaidTrans);

                var notification = new Notification()
                {
                    NotificationId = Guid.NewGuid().ToString(),
                    NotificationType = response.IsSuccess ? NotificationConst.INFORMATION : NotificationConst.ERROR,
                    Description = notifyDes,
                    CreatedTime = DateTime.Now,
                    Status = false,
                };

                _notificationService.AddNotification(notification);

               _notificationService.AddUserNotification(new UserNotification
               {
                   UserId = response.UserId,
                   NotificationId = notification.NotificationId
               });

                // save
                _unitOfWork.Save();

                return new ResponseDTO
                {
                    IsSuccess = true,
                    Message = GeneralMessage.CreateSuccess,
                    StatusCode = StatusCodeEnum.Created,
                };
            }

            return new ResponseDTO
            {
                Message = PaymentConst.INVALID_TRANS,
                StatusCode = StatusCodeEnum.BadRequest
            };
        }
    }
}
