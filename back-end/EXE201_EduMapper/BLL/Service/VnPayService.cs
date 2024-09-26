﻿using BLL.IService;
using Common.DTO.Payment;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Net.Sockets;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using DAL.Models;

namespace BLL.Service
{
    public class VnPayService : IVnPayService
    {
        private readonly SortedList<string, string> _requestData = new SortedList<string, string>(new VnPayCompare());
        private readonly IConfiguration _configuration;

        public VnPayService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CreatePaymentUrl(MemberShip memberShip, HttpContext context)
        {
            var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(_configuration["TimeZoneId"]!);
            var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);
            var tick = DateTime.Now.Ticks.ToString();
            var urlCallBack = _configuration["PaymentCallBack:ReturnUrl"];

            AddRequestData("vnp_Version", _configuration["Vnpay:Version"]!);
            AddRequestData("vnp_Command", _configuration["Vnpay:Command"]!);
            AddRequestData("vnp_TmnCode", _configuration["Vnpay:TmnCode"]!);
            AddRequestData("vnp_Amount", (memberShip.Price * 100).ToString());
            AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
            AddRequestData("vnp_CurrCode", _configuration["Vnpay:CurrCode"]!);
            AddRequestData("vnp_IpAddr", GetIpAddress(context));
            AddRequestData("vnp_Locale", _configuration["Vnpay:Locale"]!);
            AddRequestData("vnp_OrderInfo", $"Mua gói dịch vụ {memberShip.MemberShipName} tại Edumapper");
            AddRequestData("vnp_OrderType", "Buy package");
            AddRequestData("vnp_ReturnUrl", urlCallBack!);
            AddRequestData("vnp_TxnRef", tick);

            var paymentUrl = CreateRequestUrl(_configuration["Vnpay:BaseUrl"]!, _configuration["Vnpay:HashSecret"]!);

            return paymentUrl;
        }

        private string GetIpAddress(HttpContext context)
        {
            var ipAddress = string.Empty;
            try
            {
                var remoteIpAddress = context.Connection.RemoteIpAddress;

                if (remoteIpAddress != null)
                {
                    if (remoteIpAddress.AddressFamily == AddressFamily.InterNetworkV6)
                    {
                        remoteIpAddress = Dns.GetHostEntry(remoteIpAddress).AddressList
                            .FirstOrDefault(x => x.AddressFamily == AddressFamily.InterNetwork);
                    }

                    if (remoteIpAddress != null) ipAddress = remoteIpAddress.ToString();

                    return ipAddress;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            return "127.0.0.1";
        }
        private void AddRequestData(string key, string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                _requestData.Add(key, value);
            }
        }

        private string CreateRequestUrl(string baseUrl, string vnpHashSecret)
        {
            var data = new StringBuilder();

            foreach (var (key, value) in _requestData.Where(kv => !string.IsNullOrEmpty(kv.Value)))
            {
                data.Append(WebUtility.UrlEncode(key) + "=" + WebUtility.UrlEncode(value) + "&");
            }

            var querystring = data.ToString();

            baseUrl += "?" + querystring;
            var signData = querystring;
            if (signData.Length > 0)
            {
                signData = signData.Remove(data.Length - 1, 1);
            }

            var vnpSecureHash = HmacSha512(vnpHashSecret, signData);
            baseUrl += "vnp_SecureHash=" + vnpSecureHash;

            return baseUrl;
        }

        private string HmacSha512(string key, string inputData)
        {
            var hash = new StringBuilder();
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var inputBytes = Encoding.UTF8.GetBytes(inputData);
            using (var hmac = new HMACSHA512(keyBytes))
            {
                var hashValue = hmac.ComputeHash(inputBytes);
                foreach (var theByte in hashValue)
                {
                    hash.Append(theByte.ToString("x2"));
                }
            }

            return hash.ToString();
        }
    }
}
