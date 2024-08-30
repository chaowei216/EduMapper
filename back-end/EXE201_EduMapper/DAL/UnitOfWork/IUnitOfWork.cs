using DAL.Models;
using DAL.Repository;
using DAO.Models;

namespace DAL.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Users> UserRepository { get; }
        IGenericRepository<MemberShips> MemberShipRepository { get; }
        IGenericRepository<MemberShipDetails> MemberShipDetailRepository { get; }
        IGenericRepository<Centers> CenterRepository { get; }
        IGenericRepository<Courses> CourseRepository { get; }
        IGenericRepository<Exams> ExamRepository { get; }
        IGenericRepository<Feedbacks> FeedbackRepository { get; }
        IGenericRepository<Notifications> NotificationRepository { get; }
        IGenericRepository<Passages> PassageRepository { get; }
        IGenericRepository<ProgramTrainings> ProgramTrainingRepository { get; }
        IGenericRepository<Progress> ProgressRepository { get; }
        IGenericRepository<QuestionChoices> QuestionChoiceRepository { get; }
        IGenericRepository<Questions> QuestionRepository { get; }
        IGenericRepository<RefreshToken> RefreshTokenRepository { get; }
        IGenericRepository<Roles> RoleRepository { get; }
        IGenericRepository<Tests> TestRepository { get; }
        IGenericRepository<Transactions> TransactionRepository { get; }
        IGenericRepository<UserAnswers> UserAnswerRepository { get; }
        IGenericRepository<UserNotifications> UserNotificationRepository { get; }
        IGenericRepository<UserReferences> UserReferenceRepository { get; }
        void Save();
    }
}
