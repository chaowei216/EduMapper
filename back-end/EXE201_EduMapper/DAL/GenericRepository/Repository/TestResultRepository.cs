using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.GenericRepository.Repository
{
    public class TestResultRepository : GenericRepository<TestResult>, ITestResultRepository
    {
        public TestResultRepository(DataContext context) : base(context)
        {
        }
    }
}
