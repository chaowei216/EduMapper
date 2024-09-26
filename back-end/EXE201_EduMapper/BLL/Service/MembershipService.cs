using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant;
using Common.Constant.Message;
using Common.Constant.Message.MemberShip;
using Common.DTO;
using Common.DTO.MemberShip;
using Common.Enum;
using DAL.Models;
using DAL.UnitOfWork;

namespace BLL.Service
{
    public class MembershipService : IMembershipService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MembershipService(IUnitOfWork unitOfWork,
                                 IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task AddMemberShipToUser(ApplicationUser user, string memberShipId)
        {
            // check exist
            var membership = await _unitOfWork.MemberShipRepository.GetByID(memberShipId);

            if (membership == null)
                throw new NotFoundException(GeneralMessage.NotFound);

            // if no membership is found, create new one
            // add
            _unitOfWork.MemberShipDetailRepository.Insert(new MemberShipDetail
            {
                MemberShipDetailId = Guid.NewGuid().ToString(),
                MemberShipId = memberShipId,
                UserId = user.Id,
                ExpiredDate = DateTime.Now.AddDays(Config.PAID_PACKAGE_TIME),
                RegistedDate = DateTime.Now
            });
        }

        public bool CheckUniqueMemberShipName(string name)
        {
            return _unitOfWork.MemberShipRepository.IsUniqueName(name);
        }

        public MemberShipDTO CreateMemberShip(MemberShipCreateDTO request)
        {
            // map data
            var membership = _mapper.Map<MemberShip>(request);

            // set id
            membership.MemberShipId = Guid.NewGuid().ToString();

            // add 
            _unitOfWork.MemberShipRepository.Insert(membership);

            // save
            _unitOfWork.Save();

            // map return value
            var response = _mapper.Map<MemberShipDTO>(membership);

            return response;
        }

        public async Task DeleteMemberShip(string id)
        {
            var membership = await _unitOfWork.MemberShipRepository.GetByID(id);

            if (membership == null)
                throw new NotFoundException(GeneralMessage.NotFound);

            // delete
            await _unitOfWork.MemberShipRepository.Delete(id);

            // save 
            _unitOfWork.Save();
        }

        public async Task<ResponseDTO> GetAllMemberShips(QueryDTO request)
        {
            var response = await _unitOfWork.MemberShipRepository.Get(filter: !string.IsNullOrEmpty(request.Search)
                                                                        ? p => p.MemberShipName.Contains(request.Search.Trim())
                                                                        : null,
                                                                orderBy: null,
                                                                pageIndex: request.PageIndex,
                                                                pageSize: request.PageSize);

            var mappedResponse = _mapper.Map<List<MemberShipDTO>>(response);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }

        public async Task<ResponseDTO> GetMemberShip(string id)
        {
            var membership = await _unitOfWork.MemberShipRepository.GetByID(id);

            if (membership == null)
                throw new NotFoundException(GeneralMessage.NotFound);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = _mapper.Map<MemberShipDTO>(membership)
            };
        }

        public async Task<MemberShip?> GetMemberShipById(string id)
        {
            return await _unitOfWork.MemberShipRepository.GetByID(id);
        }

        public async Task<MemberShip?> GetMemberShipByName(string name)
        {
            return await _unitOfWork.MemberShipRepository.GetMemberShipByName(name);
        }

        public async Task<bool> RevokeUserMemberShip(MemberShipDetail memberShipDetail)
        {
            memberShipDetail.IsFinished = true;
            return await _unitOfWork.MemberShipDetailRepository.Update(memberShipDetail.MemberShipDetailId, memberShipDetail);
        }

        public async Task UpdateMemberShip(string id, MemberShipUpdateDTO request)
        {
            // check exist
            var membership = await _unitOfWork.MemberShipRepository.GetByID(id);

            if (membership == null)
                throw new NotFoundException(GeneralMessage.NotFound);

            // check name
            if (membership.MemberShipName != request.MemberShipName
                && !CheckUniqueMemberShipName(request.MemberShipName))
            {
                throw new BadRequestException(MemberShipMessage.ExistedName);
            }

            // map data
            var mappedMemberShip = _mapper.Map<MemberShip>(request);
            mappedMemberShip.MemberShipId = membership.MemberShipId;

            // update
            _unitOfWork.MemberShipRepository.Update(mappedMemberShip);

            // save
            _unitOfWork.Save();
        }
    }
}
