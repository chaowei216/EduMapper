namespace Common.DTO.Message
{
    public class MessageDTO
    {
        public string MessageId { get; set; } = null;
        public string FullName { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
    }
}
