using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Repository;
using DAO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.GenericRepository.Repository
{
    public class NotificationRepository : GenericRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(DataContext context) : base(context)
        {
        }
    }
}
