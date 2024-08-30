using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class QuestionChoices
    {
        [Key]
        public int ChoiceId { get; set; }
        public string ChoiceContent { get; set; } = string.Empty;
        public DateTime CrateAt { get; set; }
        public int QuestionId { get; set; }
        [ForeignKey("QuestionId")]
        public Questions Questions { get; set; } = null!;
    }
}
