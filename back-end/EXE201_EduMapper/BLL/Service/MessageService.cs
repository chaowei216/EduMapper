using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Message;
using Common.Enum;
using DAL.Models;
using DAL.UnitOfWork;
using Microsoft.AspNetCore.Identity;

namespace BLL.Service
{
    public class MessageService : IMessageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MessageService(IUnitOfWork unitOfWork,
                              IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public Message AddNewMessage(string userId, string content)
        {
            var message = new Message
            {
                MessageId = Guid.NewGuid().ToString(),
                CreatedDate = DateTime.Now,
                Content = content,
                ModifiedDate = DateTime.Now,
                UserId = userId
            };

            _unitOfWork.MessageRepository.Insert(message);

            _unitOfWork.Save();

            return message;
        }

        public async Task DeleteMessage(string messageId)
        {
            await _unitOfWork.MessageRepository.Delete(messageId);
            _unitOfWork.Save();
        }

        public async Task<ResponseDTO> GetAllMessages()
        {
            var messages = await _unitOfWork.MessageRepository.Get(orderBy: p => p.OrderBy(p => p.CreatedDate),
                                                                   includeProperties: "User");

            var mappedResponse = _mapper.Map<List<MessageDTO>>(messages);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }

        public async Task<Message?> GetMessageById(string messageId)
        {
            return await _unitOfWork.MessageRepository.GetByID(messageId);
        }

        public async Task UpdateMessage(Message message, string content)
        {
            message.Content = content;
            message.ModifiedDate = DateTime.Now;
            await _unitOfWork.MessageRepository.Update(message.MessageId, message);
            _unitOfWork.Save();
        }
    }
}
