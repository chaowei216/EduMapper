using AutoMapper;
using Common.DTO.Auth;
using Common.DTO.MemberShip;
using Common.DTO.Exam;
using Common.DTO.Passage;
using Common.DTO.Question;
using Common.DTO.Test;
using DAL.Models;
using Common.DTO.Center;
using DAO.Models;
using Common.DTO.Feedback;
using Common.DTO.ProgramTraining;
using Common.DTO;
using Common.DTO.Transaction;
using Common.DTO.Notification;
using Common.DTO.Progress;
using Common.DTO.Message;
using Common.DTO.UserAnswer;

namespace EXE201_EduMapper.Profiles
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<RegisterRequestDTO, ApplicationUser>().ReverseMap();
            CreateMap<UserAuthDTO, ApplicationUser>().ReverseMap();
            CreateMap<ExternalLoginDTO, ApplicationUser>().ReverseMap();   
            CreateMap<MemberShip, MemberShipDTO>().ReverseMap();
            CreateMap<MemberShipCreateDTO, MemberShip>().ReverseMap();
            CreateMap<UserAnswer, GetUserAnswerDTO>().ReverseMap();
            CreateMap<MemberShipUpdateDTO, MemberShip>().ReverseMap();
            CreateMap<ExternalLoginDTO, ApplicationUser>().ReverseMap();    
            CreateMap<Question, QuestionDTO>().ReverseMap();
            CreateMap<QuestionChoiceDTO, QuestionChoice>().ReverseMap();
            CreateMap<Passage, PassageDTO>().ReverseMap();
            CreateMap<Progress, ProgressDTO>().ReverseMap();
            CreateMap<Exam, ExamDTO>().ReverseMap();
            CreateMap<PassageSection, PassageSectionDTO>().ReverseMap();
            CreateMap<Test, TestDTO>().ReverseMap();
            CreateMap<Question, QuestionCreateDTO>().ReverseMap();
            CreateMap<QuestionChoice, QuestionChoiceCreateDTO>().ReverseMap();
            CreateMap<Passage, PassageIELTSCreateDTO>().ReverseMap();
            CreateMap<Passage, PassageCreateDTO>().ReverseMap();
            CreateMap<PassageSectionCreateDTO, PassageSection>().ReverseMap();
            CreateMap<Exam, ExamCreateDTO>().ReverseMap();
            CreateMap<Center, CenterDTO>().ReverseMap();
            CreateMap<Feedback, FeedbackDTO>().ReverseMap();
            CreateMap<UserAnswer, WritingDTO>().ReverseMap();
            CreateMap<Progress, ProgressCreateDTO>().ReverseMap();
            CreateMap<ProgramTraining, ProgramTrainingDTO>().ReverseMap();
            CreateMap<PagedList<Transaction>, PaginationResponseDTO<TransactionDTO>>().ReverseMap();
            CreateMap<Transaction, TransactionDTO>().ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
                                                    .ForMember(dest => dest.MemberShipName, opt => opt.MapFrom(src => src.MemberShip.MemberShipName))
                                                    .ReverseMap();
            CreateMap<PagedList<Notification>, PaginationResponseDTO<NotificationDTO>>().ReverseMap();
            CreateMap<Notification, NotificationDTO>().ReverseMap();
            CreateMap<UserAnswer, UserAnswerDTO>().ReverseMap();
            CreateMap<Message, MessageDTO>().ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User.FullName)).ReverseMap();
            CreateMap<PagedList<Exam>, ExamDTO>().ReverseMap();
            CreateMap<PagedList<Exam>, PaginationResponseDTO<ExamDTO>>().ReverseMap();
            CreateMap<PagedList<Passage>, PassageDTO>().ReverseMap();
            CreateMap<PagedList<Passage>, PaginationResponseDTO<PassageDTO>>().ReverseMap();
            CreateMap<PagedList<Test>, TestDTO>().ReverseMap();
            CreateMap<PagedList<Test>, PaginationResponseDTO<TestDTO>>().ReverseMap();
            CreateMap<PagedList<Passage>, PassageListeningDTO>().ReverseMap();
            CreateMap<PagedList<Passage>, PaginationResponseDTO<PassageListeningDTO>>().ReverseMap();
            CreateMap<PagedList<Question>, QuestionDTO>().ReverseMap();
            CreateMap<PagedList<Question>, PaginationResponseDTO<QuestionDTO>>().ReverseMap();
            CreateMap<PagedList<Center>, CenterDTO>().ReverseMap();
            CreateMap<Test, TestCreateDTO>().ReverseMap();
            CreateMap<PagedList<Center>, PaginationResponseDTO<CenterDTO>>().ReverseMap();
            CreateMap<Progress, ProgressSpeakingDTO>().ForMember(dest => dest.ExamName, opt => opt.MapFrom(src => src.Exam.ExamName))
                                                    .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User.FullName))
                                                    .ForMember(dest => dest.UserEmail, opt => opt.MapFrom(src => src.User.Email))
                                                    .ReverseMap();
            CreateMap<UserAnswer, WritingAnswerDTO>().ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User.FullName))
                                                    .ForMember(dest => dest.QuestionText, opt => opt.MapFrom(src => src.Question.QuestionText))
                                                    .ForMember(dest => dest.PassageTitle, opt => opt.MapFrom(src => src.Question.Passage.PassageTitle))
                                                    .ForMember(dest => dest.PassageContent, opt => opt.MapFrom(src => src.Question.Passage.PassageContent))
                                                    .ReverseMap();
            CreateMap<PagedList<UserAnswer>, WritingAnswerDTO>().ReverseMap();
            CreateMap<Progress, RequestSpeakingDTO>().ReverseMap();
            CreateMap<PagedList<UserAnswer>, PaginationResponseDTO<WritingAnswerDTO>>().ReverseMap();
            CreateMap<PagedList<Progress>, PaginationResponseDTO<ProgressSpeakingDTO>>().ReverseMap();
        }
    }
}
