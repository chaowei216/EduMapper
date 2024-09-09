using DAL.GenericRepository.IRepository;
using DAL.Models;
using DAL.Repository;
using DAO.Models;

namespace DAL.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<ApplicationUser> UserRepository { get; }
        IGenericRepository<MemberShip> MemberShipRepository { get; }
        IGenericRepository<MemberShipDetail> MemberShipDetailRepository { get; }
        IGenericRepository<Center> CenterRepository { get; }
        IGenericRepository<Course> CourseRepository { get; }
        IGenericRepository<Exam> ExamRepository { get; }
        IGenericRepository<Feedback> FeedbackRepository { get; }
        IGenericRepository<Notification> NotificationRepository { get; }
        IGenericRepository<Passage> PassageRepository { get; }
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
        void Save();
    }
}
