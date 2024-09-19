﻿using Common.DTO;
using Common.DTO.MemberShip;
using DAL.Models;

namespace BLL.IService
{
    public interface IMembershipService
    {
        /// <summary>
        /// Get all memberships
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetAllMemberShips(QueryDTO request);

        /// <summary>
        /// Create new membership
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        MemberShipDTO CreateMemberShip(MemberShipCreateDTO request);

        /// <summary>
        /// Check if membership name is unique
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        bool CheckUniqueMemberShipName(string name);

        /// <summary>
        /// Get membership by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetMemberShip(string id);

        /// <summary>
        /// Update membership
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        Task UpdateMemberShip(string id, MemberShipUpdateDTO request);

        /// <summary>
        /// Delete mebership
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteMemberShip(string id);

        /// <summary>
        /// add memberShip to user
        /// </summary>
        /// <param name="user"></param>
        /// <param name="memberShipId"></param>
        /// <returns></returns>
        Task AddMemberShipToUser(ApplicationUser user, string memberShipId);

        /// <summary>
        /// Get membership by name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        Task<MemberShip?> GetMemberShipByName(string name);
    }
}
