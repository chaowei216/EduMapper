﻿namespace Common.Constant.Email
{
    public static class EmailTemplate
    {
        public const string logoUrl = "https://acet.edu.vn/wp-content/uploads/2020/02/cach-chon-trung-tam-tieng-anh-ha-noi-tot-nhat-cho-ban.jpg";
        public static string OTPEmailTemplate(string userEmail, string otpCode, string subject)
        {
            string htmlTemplate = @"<head>    
    <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type"">
    <title>
        {TITLE}
    </title>
    <style type=""text/css"">
        html {
            background-color: #FFF;
        }
        body {
            font-size: 120%;
            background-color: wheat;
            border-radius: 5px;
        }
        .logo {
            text-align: center;
            padding: 2% 0;
        }
        .logo img {
            width: 40%;
            height: 35%;
        }
        .title {
            padding: 2% 5%;
            text-align: center; 
            background-color: #FFF; 
            border-radius: 5px 5px 0 0;
        }
        .OTPCode {
            color: darkorange; 
            text-align: center;
        }
        .notice {
            padding: 2% 5%;
            text-align: center;
            background-color: #FFF;
        }
        .footer {
            padding: 2% 5%;
            text-align: center; 
            font-size: 80%; 
            opacity: 0.8; 
        }
        .do-not {
            color: red;
        }
    </style>
</head>
<body>
        <div class=""logo"">
            <img src=""{LOGO_URL}""/>
        </div>
        <div class=""title"">
            <p>Hello {USER_NAME}</p>
            <p>OTP code of your EduMapper account is </p>
        </div>
        <div class=""OTPCode"">
            <h1>{OTP_CODE}</h1>
        </div>
        <div class=""notice"">
            <p>Expires in 1 hour. <span class=""do-not""> DO NOT share this code with others, including EduMapper employees.</span>
            </p>
        </div>
        <div class=""footer"">
            <p>This is an automatic email. Please do not reply to this email.</p>
            <p>17th Floor LandMark 81, 208 Nguyen Huu Canh Street, Binh Thanh District, Ho Chi Minh 700000, Vietnam</p>
        </div>
</body>
</html>
";
            htmlTemplate = htmlTemplate.Replace("{OTP_CODE}", otpCode)
                .Replace("{USER_NAME}", userEmail)
                .Replace("{LOGO_URL}", logoUrl)
                .Replace("{TITLE}", subject);

            return htmlTemplate;
        }
    }
}


