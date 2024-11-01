using DAL.Models;
using DAL.Repository;

namespace DAL.GenericRepository.IRepository
{
    public interface IMemberShipDetailRepository: IGenericRepository<MemberShipDetail>
    {
        Task<IEnumerable<MemberShipDetail>> GetMemberShipOfUser(string userId);
        Task<MemberShipDetail?> GetMemberShipDetail(string userId, string memberShipId);
        Task<MemberShip?> GetCurMemberShip(string userId);
    }
}
