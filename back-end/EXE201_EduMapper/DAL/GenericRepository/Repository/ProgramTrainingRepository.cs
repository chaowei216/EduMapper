using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;

namespace DAL.GenericRepository.Repository
{
    public class ProgramTrainingRepository : GenericRepository<ProgramTraining>, IProgramTrainingRepository
    {
        public ProgramTrainingRepository(DataContext context) : base(context) { }
    }
}
