using Common.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DAO.Models
{
    public class Roles
    {
        [Key]
        public int RoleId { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(24)")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RoleEnum RoleName { get; set; }
        public ICollection<Users> Users { get; set; } = null!;
    }
}
