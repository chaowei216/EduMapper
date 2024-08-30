using DAO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class MemberShipDetails
    {
        public int UserId { get; set; }
        public int MemberShipId { get; set; }
        public DateTime RegistedDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public Users User { get; set; } = null!;
        public MemberShips MemberShip { get; set; } = null!;
    }
}
