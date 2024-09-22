using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.DTO;
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
    public class PassageService : IPassageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PassageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ResponseDTO> GetPassageById(string id)
        {
            var thisPassage = await _unitOfWork.PassageRepository.Get(c => c.PassageId == id, includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers");

            var mapList = _mapper.Map<List<Passage>>(thisPassage);

            if (mapList == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mapList,
                StatusCode = StatusCodeEnum.OK
            };
        }
    }
}
