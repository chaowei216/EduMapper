using Common.Enum;

namespace Common.DTO
{
    public class ResponseDTO
    {
        public StatusCodeEnum StatusCode { get; set; }
        public bool IsSuccess { get; set; } = false;
        public string Message { get; set; } = null!;
        public object? MetaData { get; set; }
    }
}
