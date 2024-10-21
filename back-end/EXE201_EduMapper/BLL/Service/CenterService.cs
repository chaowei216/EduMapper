using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Center;
using Common.DTO.Exam;
using Common.DTO.Query;
using Common.DTO.Test;
using Common.Enum;
using DAL.Models;
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

        public async Task<ResponseDTO> GetAllAdverCenters(CenterParameters request)
        {
            var response = await _unitOfWork.CenterRepository.Get(filter: c => (string.IsNullOrEmpty(request.Search)
                                                               || c.CentersName.Contains(request.Search.Trim()))
                                                               && (string.IsNullOrEmpty(request.Location)
                                                               || c.Location.Contains(request.Location.ToString()))
                                                               && (string.IsNullOrEmpty(request.LearningTypes.ToString())
                                                               || c.Location.Contains(request.LearningTypes.ToString())),
                                                               orderBy: null,
                                                               pageIndex: request.PageNumber,
                                                               pageSize: request.PageSize);

            var totalCount = response.Count(); // Make sure to use CountAsync to get the total count
            var items = response.ToList(); // Use ToListAsync to fetch items asynchronously

            // Create the PagedList and map the results
            var pageList = new PagedList<Center>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<CenterDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<CenterDTO>>(items);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }

        public async Task<ResponseDTO> GetAllCenters(CenterParameters request)
        {
            var response = await _unitOfWork.CenterRepository.Get(filter: c => (string.IsNullOrEmpty(request.Search)
                                                                || c.CentersName.Contains(request.Search.Trim()))
                                                                && (string.IsNullOrEmpty(request.Location)
                                                                || c.Location.Contains(request.Location.ToString()))
                                                                && (string.IsNullOrEmpty(request.LearningTypes.ToString())
                                                                || c.Location.Contains(request.LearningTypes.ToString())),
                                                                orderBy: null,
                                                                pageIndex: request.PageNumber,
                                                                pageSize: request.PageSize,
                                                                includeProperties: "Feedbacks,ProgramTrainings");

            var totalCount = response.Count(); // Make sure to use CountAsync to get the total count
            var items = response.ToList(); // Use ToListAsync to fetch items asynchronously

            // Create the PagedList and map the results
            var pageList = new PagedList<Center>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<CenterDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<CenterDTO>>(items);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
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
