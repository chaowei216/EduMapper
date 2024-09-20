using BLL.IService;
using Common.Constant.Email;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Service
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendOTPEmail(string userEmail, string otpCode, string subject)
        {
            var sendEmail = _configuration.GetSection("SendEmailAccount")["Email"]!;
            var toEmail = userEmail;
            var htmlBody = EmailTemplate.OTPEmailTemplate(userEmail, otpCode, subject);
            MailMessage mailMessage = new MailMessage(sendEmail, toEmail, subject, htmlBody);
            mailMessage.IsBodyHtml = true;

            var smtpServer = _configuration.GetSection("SendEmailAccount")["SmtpServer"];
            int.TryParse(_configuration.GetSection("SendEmailAccount")["Port"], out int port);
            var userNameEmail = _configuration.GetSection("SendEmailAccount")["UserName"];
            var password = _configuration.GetSection("SendEmailAccount")["Password"];

            SmtpClient client = new SmtpClient(smtpServer, port);
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(userNameEmail, password);
            client.EnableSsl = true; // Enable SSL/TLS encryption

            client.Send(mailMessage);
        }
    }
}
