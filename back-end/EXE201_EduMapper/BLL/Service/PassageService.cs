using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Firebase;
using Common.Constant.Message;
using Common.Constant.Message.Question;
using Common.DTO;
using Common.DTO.Passage;
using Common.DTO.Query;
using Common.Enum;
using DAL.Models;
using DAL.UnitOfWork;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace BLL.Service
{
    public class PassageService : IPassageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly StorageClient _storageClient;
        private readonly IMapper _mapper;

        public PassageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

            string pathToJsonFile = "firebase.json";

            try
            {
                // Create GoogleCredential from the JSON file
                GoogleCredential credential = GoogleCredential.FromFile(pathToJsonFile)
                    .CreateScoped(FirebaseLink.LinkFirebase);

                // Create StorageClient with the provided credential
                _storageClient = StorageClient.Create(credential);
            }
            catch (Exception ex)
            {
                // Handle any exceptions related to credential creation
                throw new Exception(FirebaseLink.FailToCreatCer + ex.Message);
            }
        }

        public async Task<FileStream> RetrieveItemAsync(string rootPath)
        {
            try
            {
                // Create temporary file to save the memory stream contents
                var fileName = Path.GetTempFileName();

                // Create an empty zip file
                using (var fileStream = new FileStream(fileName, FileMode.Create))
                {
                    using (var stream = new MemoryStream())
                    {
                        // Download the file contents
                        await _storageClient.DownloadObjectAsync("edumapper-ed77e.appspot.com", rootPath, stream);

                        // Set the position of the memory stream to the beginning
                        stream.Seek(0, SeekOrigin.Begin);

                        // Copy the contents of the memory stream to the file stream
                        await stream.CopyToAsync(fileStream);
                    }
                }

                // Return FileStream for the file
                return new FileStream(fileName, FileMode.Open, FileAccess.Read);
            }
            catch (Google.GoogleApiException ex) when (ex.Error.Code == 403)
            {
                Console.WriteLine($"Access denied: {ex.Error.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return null!;
        }


        public async Task<ResponseDTO> AddQuestionToPassage(AddQuestionDTO passage)
        {
            var thisPassage = await _unitOfWork.PassageRepository.GetByID(passage.PassageId);

            if (thisPassage == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            if(passage.QuestionIds == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            foreach(var question in passage.QuestionIds)
            {
                var thisQuestion = await _unitOfWork.QuestionRepository.GetByID(question);

                if (thisQuestion == null)
                {
                    throw new NotFoundException(GeneralMessage.NotFound);
                }

                if (thisQuestion.PassageId != null)
                {
                    return new ResponseDTO
                    {
                        IsSuccess = false,
                        Message = QuestionMessage.DuplicateQuestion,
                        StatusCode = StatusCodeEnum.BadRequest,
                    };
                }

                thisQuestion.PassageId = passage.PassageId;
                _unitOfWork.QuestionRepository.Update(thisQuestion);
                _unitOfWork.Save();
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = QuestionMessage.AddQuestionSuccess,
                StatusCode = StatusCodeEnum.NoContent,
            };
        }

        public ResponseDTO CreateIELTSPassage(PassageIELTSCreateDTO passage)
        {
            var mapPassage = _mapper.Map<Passage>(passage);
            mapPassage.PassageId = Guid.NewGuid().ToString();
            mapPassage.CreatedAt = DateTime.Now;

            if (passage.SubQuestion != null)
            {
                foreach (var question in mapPassage.SubQuestion)
                {
                    question.QuestionId = Guid.NewGuid().ToString();
                    question.CreatedAt = DateTime.Now;
                    question.PassageId = mapPassage.PassageId;

                    foreach (var choice in question.Choices)
                    {
                        choice.ChoiceId = Guid.NewGuid().ToString();
                        choice.CreatedAt = DateTime.Now;
                        _unitOfWork.QuestionChoiceRepository.Insert(choice);
                    }

                    _unitOfWork.QuestionRepository.Insert(question);
                }
            }

            foreach (var section in mapPassage.Sections)
            {
                section.PassageSectionId = Guid.NewGuid().ToString();

                _unitOfWork.SectionRepository.Insert(section);
            }

            _unitOfWork.PassageRepository.Insert(mapPassage);

            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created,
                MetaData = mapPassage
            };
        }

        public async Task<ResponseDTO> CreateListeningPassage(PassageCreateDTO passage, IFormFile? file)
        {
            var mapPassage = _mapper.Map<Passage>(passage);
            string files = string.Empty;
            mapPassage.PassageId = Guid.NewGuid().ToString();
            mapPassage.CreatedAt = DateTime.Now;

            if(file != null)
            {
                var imageName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                files = imageName;
                // Upload each image to Firebase Storage
                using (var stream = file.OpenReadStream())
                {
                    await _storageClient.UploadObjectAsync(
                    bucket: "edumapper-ed77e.appspot.com",
                    objectName: imageName,
                    contentType: file.ContentType,
                    source: stream);
                }
                mapPassage.ListeningFile = files;
            }
            
            _unitOfWork.PassageRepository.Insert(mapPassage);

            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created,
                MetaData = mapPassage
            };
        }

        public ResponseDTO CreatePassage(PassageCreateDTO passage)
        {
            var mapPassage = _mapper.Map<Passage>(passage);
            mapPassage.PassageId = Guid.NewGuid().ToString();
            mapPassage.CreatedAt = DateTime.Now;

            _unitOfWork.PassageRepository.Insert(mapPassage);

            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created,
                MetaData = mapPassage
            };
        }

        public async Task<ResponseDTO> GetAllPassages(PassageParameters request)
        {
            var response = await _unitOfWork.PassageRepository.Get(filter: !string.IsNullOrEmpty(request.Search)
                                                                        ? p => p.PassageTitle.Contains(request.Search.Trim())
                                                                        : null,
                                                                orderBy: null,
                                                                includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers");

            var totalCount = response.Count(); // Make sure to use CountAsync to get the total count
            var items = response.ToList(); // Use ToListAsync to fetch items asynchronously

            // Create the PagedList and map the results
            var pageList = new PagedList<Passage>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<PassageDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<PassageDTO>>(pageList);


            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }

        public async Task<ResponseDTO> GetAllListeningPassages(PassageParameters request)
        {
            var response = await _unitOfWork.PassageRepository.Get(includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers",
                                                                filter: c => c.ListeningFile != null && (string.IsNullOrEmpty(request.Search)
                                                                || c.PassageTitle.Contains(request.Search.Trim())),
                                                                orderBy: null);

            var totalCount = response.Count(); // Make sure to use CountAsync to get the total count
            var items = response.ToList(); // Use ToListAsync to fetch items asynchronously

            // Create the PagedList and map the results
            var pageList = new PagedList<Passage>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<PassageListeningDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<PassageListeningDTO>>(pageList);


            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }

        public async Task<ResponseDTO> GetExceptIELTSPassage(PassageParameters request)
        {
            var response = await _unitOfWork.PassageRepository.Get(includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers",
                                                                filter: c => !c.Sections.Any() && (string.IsNullOrEmpty(request.Search)
                                                                || c.PassageTitle.Contains(request.Search.Trim())),
                                                                orderBy: null);

            var totalCount = response.Count(); // Make sure to use CountAsync to get the total count
            var items = response.ToList(); // Use ToListAsync to fetch items asynchronously

            // Create the PagedList and map the results
            var pageList = new PagedList<Passage>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<PassageDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<PassageDTO>>(items);
            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }

        public async Task<ResponseDTO> GetIELTSPassage(PassageParameters request)
        {
            var response = await _unitOfWork.PassageRepository.Get(includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers",
                                                                filter: c => c.Sections.Any() && (string.IsNullOrEmpty(request.Search)
                                                                || c.PassageTitle.Contains(request.Search.Trim())),
                                                                orderBy: null);

            var totalCount = response.Count(); // Make sure to use CountAsync to get the total count
            var items = response.ToList(); // Use ToListAsync to fetch items asynchronously

            // Create the PagedList and map the results
            var pageList = new PagedList<Passage>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<PassageDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<PassageDTO>>(items);
            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
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
