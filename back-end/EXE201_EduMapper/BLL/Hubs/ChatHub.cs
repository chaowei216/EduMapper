using BLL.IService;
using Common.Constant.Message.Message;
using Microsoft.AspNetCore.SignalR;

namespace BLL.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IMessageService _messageService;
        private readonly IUserService _userService;

        public ChatHub(IMessageService messageService,
                       IUserService userService)
        {
            _messageService = messageService;
            _userService = userService;
        }

        public async Task SendMessage(string userId, string content)
        {
            try
            {
                // check user
                var user = await _userService.GetUserById(userId);

                if (user == null)
                {
                    await Clients.Caller.SendAsync("ReceiveError", MessageConst.NOT_EXISTED_USER);
                    return;
                }

                var message = _messageService.AddNewMessage(userId, content);

                // notify
                await Clients.All.SendAsync("ReceiveMessage", message.MessageId, user!.FullName, message.Content, message.CreatedDate);
            } catch (Exception)
            {
                await Clients.Caller.SendAsync("ReceiveError", MessageConst.FAIL_TO_SEND);
            }
        }

        public async Task DeleteMessage(string messageId, string userId)
        {
            try
            {
                // Check user
                var user = await _userService.GetUserById(userId);
                if (user == null)
                {
                    await Clients.Caller.SendAsync("ReceiveError", MessageConst.NOT_EXISTED_USER);
                    return;
                }

                // check message
                var message = await _messageService.GetMessageById(messageId);
                if (message == null)
                {
                    await Clients.Caller.SendAsync("ReceiveError", MessageConst.NOT_EXISTED_MESS);
                    return;
                }

                if (message.UserId != userId)
                {
                    await Clients.Caller.SendAsync("ReceiveError", MessageConst.NOT_ACCEPTED);
                    return;
                }

                // delete
                await _messageService.DeleteMessage(messageId);

                // notify
                await Clients.All.SendAsync("MessageDeleted", messageId);
            }
            catch (Exception)
            {
                await Clients.Caller.SendAsync("ReceiveError", MessageConst.FAIL_TO_DELETE);
            }
        }

        public async Task UpdateMessage(string userId, string messageId, string content)
        {
            try
            {
                // check message
                var message = await _messageService.GetMessageById(messageId);
                if (message == null)
                {
                    await Clients.Caller.SendAsync("ReceiveError", MessageConst.NOT_EXISTED_MESS);
                    return;
                }

                if (message.UserId != userId)
                {
                    await Clients.Caller.SendAsync("ReceiveError", MessageConst.NOT_ACCEPTED);
                    return;
                }

                // update
                await _messageService.UpdateMessage(message, content);

                // notify
                await Clients.All.SendAsync("MessageUpdated", messageId, content);
            }
            catch (Exception)
            {
                await Clients.Caller.SendAsync("ReceiveError", MessageConst.FAIL_TO_UPDATE);
            }
        }
    }
}
