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
        IGenericRepository<ProgramTraining> ProgramTrainingRepository { get; }
        IGenericRepository<Progress> ProgressRepository { get; }
        IGenericRepository<QuestionChoice> QuestionChoiceRepository { get; }
        IGenericRepository<Question> QuestionRepository { get; }
        IGenericRepository<RefreshToken> RefreshTokenRepository { get; }
        IGenericRepository<Test> TestRepository { get; }
        IGenericRepository<Transaction> TransactionRepository { get; }
        IGenericRepository<UserAnswer> UserAnswerRepository { get; }
        IGenericRepository<UserNotification> UserNotificationRepository { get; }
        IGenericRepository<UserReference> UserReferenceRepository { get; }
        void Save();
    }
}
