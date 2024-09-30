using Common.DTO;
using DAL.Models;

namespace BLL.IService
{
    public interface IMessageService
    {
        Task<ResponseDTO> GetAllMessages();
        Message AddNewMessage(string userId, string content);
        Task<Message?> GetMessageById(string messageId);
        Task UpdateMessage(Message message, string content);
        Task DeleteMessage(string messageId);
    }
}
