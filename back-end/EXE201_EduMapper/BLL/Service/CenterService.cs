using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Center;
using Common.DTO.Exam;
using Common.DTO.Test;
using Common.Enum;
using DAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Service
{
    public class CenterService : ICenterService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CenterService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ResponseDTO> GetAllCenters(QueryDTO request)
        {
            var response = await _unitOfWork.CenterRepository.Get(filter: !string.IsNullOrEmpty(request.Search)
                                                            ? p => p.CentersName.Contains(request.Search.Trim())
                                                            : null,
                                                    orderBy: null,
                                                    pageIndex: request.PageIndex,
                                                    pageSize: request.PageSize,
                                                    includeProperties: "Feedbacks,ProgramTrainings");

            var mapList = _mapper.Map<List<CenterDTO>>(response);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mapList
            };
        }

        public async Task<ResponseDTO> GetCenterById(string id)
        {
            var centers = await _unitOfWork.CenterRepository.Get(includeProperties: "Feedbacks,ProgramTrainings",
                                                            filter: c => c.CenterId == id);


            if (centers == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            var mapList = _mapper.Map<List<CenterDTO>>(centers);
            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = mapList,
                StatusCode = StatusCodeEnum.OK,
                Message = GeneralMessage.GetSuccess
            };
        }
    }
}
