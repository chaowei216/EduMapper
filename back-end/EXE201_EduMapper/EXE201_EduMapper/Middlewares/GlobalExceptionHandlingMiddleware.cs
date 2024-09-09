using BLL.Exceptions;
using Common.DTO;
using Common.Enum;

namespace EXE201_EduMapper.Middlewares
{
    public class GlobalExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public GlobalExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleException(context, ex);
            }
        }

        private async Task HandleException(HttpContext context, Exception ex)
        {
            // Set default (500) when exception occurs
            StatusCodeEnum statusCode = StatusCodeEnum.InteralServerError;
            
            // call dto to return
            ResponseDTO responseDto = new ();

            // map exception
            switch (ex)
            {
                case BadRequestException badEx:
                    statusCode = StatusCodeEnum.BadRequest;
                    responseDto = new ResponseDTO
                    {
                        Message = badEx.Message,
                        StatusCode = statusCode
                    };

                    break;

                case NotFoundException notFoundEx:
                    statusCode = StatusCodeEnum.NotFound;
                    responseDto = new ResponseDTO
                    {
                        Message = notFoundEx.Message,
                        StatusCode = statusCode
                    };

                    break;

                case UnAuthorizedException unAuthorizedEx:
                    statusCode = StatusCodeEnum.UnAuthorized;
                    responseDto = new ResponseDTO
                    {
                        Message = unAuthorizedEx.Message,
                        StatusCode = statusCode
                    };

                    break;


                default:
                    responseDto = new ResponseDTO
                    {
                        Message = ex.Message,
                        StatusCode = statusCode
                    };

                    break;
            }

            // set response status code
            context.Response.StatusCode = (int)statusCode;
            await context.Response.WriteAsJsonAsync(responseDto);
        }
    }
}
