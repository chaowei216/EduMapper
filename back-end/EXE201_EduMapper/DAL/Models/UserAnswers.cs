using DAO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class UserAnswers
    {
        public int UserId { get; set; }
        public int QuestionId { get; set; }
        public string UserChoice { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreateAt { get; set; }
        public bool IsCorrect { get; set; }
        public Users User { get; set; } = null!;
        public Questions Question { get; set; } = null!;   
    }
}
