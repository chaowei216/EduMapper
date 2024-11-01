using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;
using DAO.Models;

namespace DAL.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository UserRepository { get; }
        IMemberShipRepository MemberShipRepository { get; }
        IMemberShipDetailRepository MemberShipDetailRepository { get; }
        ICenterRepository CenterRepository { get; }
        ICourseRepository CourseRepository { get; }
        IExamRepository ExamRepository { get; }
        IFeedbackRepository FeedbackRepository { get; }
        INotificationRepository NotificationRepository { get; }
        IPassageRepository PassageRepository { get; }
        IProgramTrainingRepository ProgramTrainingRepository { get; }
        IProgressRepository ProgressRepository { get; }
        IQuestionChoiceRepository QuestionChoiceRepository { get; }
        IQuestionRepository QuestionRepository { get; }
        IRefreshTokenRepository RefreshTokenRepository { get; }
        ITestRepository TestRepository { get; }
        ITransactionRepository TransactionRepository { get; }
        IUserAnswerRepository UserAnswerRepository { get; }
        IUserNotificationRepository UserNotificationRepository { get; }
        IUserReferenceRepository UserReferenceRepository { get; }
        ISectionRepository SectionRepository { get; }
        IMessageRepository MessageRepository { get; }
        IAdverCenterRepository AdverCenterRepository { get; }
        ITestResultRepository TestResultRepository { get; }
        void Save();
    }
}
