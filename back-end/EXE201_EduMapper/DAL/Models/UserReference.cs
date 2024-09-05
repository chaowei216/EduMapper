using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class UserReference
    {
        [Key]
        public string ReferenceId { get; set; } = null!;
        public double Budget { get; set; }
        public string Type { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public string Location { get; set; } = string.Empty;
        public double Target { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int? Age { get; set; }
        public string UserId { get; set; } = null!;
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } = null!;
    }
}
