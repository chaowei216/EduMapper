﻿using Common.DTO.Exam;

namespace BLL.IService
{
    public interface IEmailService
    {
        /// <summary>
        /// Send code for reset password
        /// </summary>
        /// <param name="userEmail"></param>
        /// <param name="otpCode"></param>
        /// <param name="subject"></param>
        void SendOTPEmail(string userEmail, string otpCode, string subject);

        /// <summary>
        /// Send email for speaking test
        /// </summary>
        /// <param name="request"></param>
        /// <param name="subject"></param>
        void SendSpeakingTestEmail(ScheduleSpeakingDTO request, DateTime scheduleDate, string subject);


        /// <summary>
        /// Send email for speaking test
        /// </summary>
        /// <param name="request"></param>
        /// <param name="subject"></param>
        void SendWritingTestEmail(string email, string studentName, double score, string feedback, string subject);

        /// <summary>
        /// Send email for speaking test
        /// </summary>
        /// <param name="request"></param>
        /// <param name="subject"></param>
        void SendSpeakingTestEmail(string email, string studentName, double score, string feedback, string subject);
        
        /// <summary>
        /// Send email after payment
        /// </summary>
        /// <param name="email"></param>
        /// <param name="studentName"></param>
        /// <param name="subject"></param>
        void SendEmailAfterPayment(string email, string studentName, string subject);
    }
}
