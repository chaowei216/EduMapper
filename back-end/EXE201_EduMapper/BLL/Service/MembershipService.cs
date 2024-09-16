using AutoMapper;
using BLL.IService;
using Common.Constant.Message;
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

        public bool CheckUniqueMemberShipName(string name)
        {
            return _unitOfWork.MemberShipRepository.IsUniqueName(name);
        }

        public ResponseDTO CreateMemberShip(MemberShipCreateDTO request)
        {
            // map data
            var membership = _mapper.Map<MemberShip>(request);

            // set id
            membership.MemberShipId = Guid.NewGuid().ToString();
            
            // add 
            _unitOfWork.MemberShipRepository.Insert(membership);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.Created,
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                MetaData = _mapper.Map<MemberShipDTO>(membership)
            };
        }

        public ResponseDTO GetAllMemberShips(QueryDTO request)
        {   
            var response = _unitOfWork.MemberShipRepository.Get(filter: !string.IsNullOrEmpty(request.Search)
                                                                        ? p => p.MemberShipName.Contains(request.Search.Trim())
                                                                        : null,
                                                                orderBy: null,
                                                                pageIndex: request.PageIndex,
                                                                pageSize: request.PageSize).ToList();

            var mappedResponse = _mapper.Map<List<MemberShipDTO>>(response);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }
    }
}
