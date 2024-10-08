using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class AdvertisingCenter
    {
        [Key]
        public string AdverCenterId { get; set; } = string.Empty;
        public double AdverBudget { get; set; }
        public string? CenterDescription { get; set; }
        public List<string>? AdverCenterImage { get; set; } = null!;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string CenterId { get; set; } = string.Empty ;
        [ForeignKey("CenterId")]
        public Center Center { get; set; } = null!;
    }
}
