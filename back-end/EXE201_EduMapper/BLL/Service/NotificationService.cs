using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.Constant.Notification;
using Common.DTO;
using Common.DTO.Notification;
using Common.DTO.Query;
using Common.Enum;
using DAL.UnitOfWork;
using DAO.Models;

namespace BLL.Service
{
    public class NotificationService : INotificationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NotificationService(IUnitOfWork unitOfWork,
                                   IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public void AddNotification(Notification notification)
        {
            _unitOfWork.NotificationRepository.Insert(notification);
        }

        public ResponseDTO AddSystemNotification(NotificationCreateDTO notification)
        {
            var newNoti = new Notification
            {
                NotificationId = Guid.NewGuid().ToString(),
                Description = notification.Description,
                CreatedTime = DateTime.Now,
                NotificationType = NotificationConst.SYSTEM,
                Status = false
            };

            _unitOfWork.NotificationRepository.Insert(newNoti);

            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                StatusCode = StatusCodeEnum.Created,
                Message = GeneralMessage.CreateSuccess,
                MetaData = _mapper.Map<NotificationDTO>(newNoti)
            };
        }

        public void AddUserNotification(UserNotification notification)
        {
            _unitOfWork.UserNotificationRepository.Insert(notification);
        }

        public async Task<ResponseDTO> GetNotificationsOfUser(string userId, NotificationParameters parameters)
        {
            var notifications = await _unitOfWork.NotificationRepository.GetNotificationsOfUser(userId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<NotificationDTO>>(notifications);
            mappedResponse.Data = _mapper.Map<List<NotificationDTO>>(notifications);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }

        public async Task<ResponseDTO> GetSystemNotifications(NotificationParameters parameters)
        {
            var notifications = await _unitOfWork.NotificationRepository.GetSystemNotifications(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<NotificationDTO>>(notifications);
            mappedResponse.Data = _mapper.Map<List<NotificationDTO>>(notifications);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }
    }
}
