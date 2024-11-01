using DAL.Models;
using DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.GenericRepository.IRepository
{
    public interface ITestResultRepository: IGenericRepository<TestResult>
    {
    }
}
