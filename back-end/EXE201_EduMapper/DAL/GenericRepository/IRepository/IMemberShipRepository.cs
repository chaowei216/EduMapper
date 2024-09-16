using DAL.Models;
using DAL.Repository;

namespace DAL.GenericRepository.IRepository
{
    public interface IMemberShipRepository: IGenericRepository<MemberShip>
    {
        bool IsUniqueName(string name);
    }
}
