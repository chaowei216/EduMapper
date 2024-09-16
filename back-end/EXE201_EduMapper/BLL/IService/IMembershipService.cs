using Common.DTO;
using Common.DTO.MemberShip;

namespace BLL.IService
{
    public interface IMembershipService
    {
        /// <summary>
        /// Get all memberships
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        ResponseDTO GetAllMemberShips(QueryDTO request);

        /// <summary>
        /// Create new membership
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        ResponseDTO CreateMemberShip(MemberShipCreateDTO request);

        /// <summary>
        /// Check if membership name is unique
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        bool CheckUniqueMemberShipName(string name);
    }
}
