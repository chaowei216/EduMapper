﻿namespace BLL.IService
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
    }
}
