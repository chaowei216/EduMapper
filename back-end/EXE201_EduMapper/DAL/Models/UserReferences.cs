using DAO.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class UserReferences
    {
        [Key]
        public int ReferenceId { get; set; }
        public double Budget { get; set; }
        public string Type { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; }
        public string Location { get; set; } = string.Empty;
        public double Target { get; set; }
        public DateTime UpdateDate { get; set; }
        public int? Age { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users User { get; set; } = null!;
    }
}
