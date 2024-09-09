using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;

namespace DAL.GenericRepository.Repository
{
    public class TestRepository : GenericRepository<Test>, ITestRepository
    {
        public TestRepository(DataContext context) : base(context) { }
    }
}
