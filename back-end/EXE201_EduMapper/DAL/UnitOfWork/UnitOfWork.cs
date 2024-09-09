using DAL.Data;
using DAL.GenericRepository.IRepository;
using DAL.GenericRepository.Repository;
using DAL.Models;
using DAL.Repository;
using DAO.Models;

namespace DAL.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private DataContext _context;
        private UserRepository _userRepository;
        private MemberShipRepository _memberShipRepository;
        private MemberShipDetailRepository _memberShipDetailRepository;
        private CenterRepository _centerRepository;
        private CourseRepository _courseRepository;
        private ExamRepository _examRepository;
        private FeedbackRepository _feedbackRepository;
        private NotificationRepository _notificationRepository;
        private PassageRepository _passageRepository;
        private ProgramTrainingRepository _programTrainingRepository;
        private ProgressRepository _progressRepository ;
        private QuestionChoiceRepository _questionChoiceRepository ;
        private QuestionRepository _questionRepository ;
        private RefreshTokenRepository _refreshTokenRepository ;
        private TestRepository _testRepository ;
        private TransactionRepository _transactionRepository ;
        private UserAnswerRepository _userAnswerRepository ;
        private UserNotificationRepository _userNotificationRepository ;
        private UserReferenceRepository _userReferenceRepository ;

        public IUserRepository UserRepository => _userRepository ??= new UserRepository(_context);

        public IMemberShipRepository MemberShipRepository => _memberShipRepository ??= new MemberShipRepository(_context);

        public IMemberShipDetailRepository MemberShipDetailRepository => _memberShipDetailRepository ??= new MemberShipDetailRepository(_context);

        public ICenterRepository CenterRepository => _centerRepository ??= new CenterRepository(_context);


        public ICourseRepository CourseRepository => _courseRepository ??= new CourseRepository(_context);

        public IExamRepository ExamRepository => _examRepository ??= new ExamRepository(_context);

        public IFeedbackRepository FeedbackRepository => _feedbackRepository ??= new FeedbackRepository(_context);

        public INotificationRepository NotificationRepository => _notificationRepository ??= new NotificationRepository(_context);

        public IPassageRepository PassageRepository => _passageRepository ??= new PassageRepository(_context);

        public IProgramTrainingRepository ProgramTrainingRepository => _programTrainingRepository ??= new ProgramTrainingRepository(_context);

        public IProgressRepository ProgressRepository => _progressRepository ??= new ProgressRepository(_context);

        public IQuestionChoiceRepository QuestionChoiceRepository => _questionChoiceRepository ??= new QuestionChoiceRepository(_context);

        public IQuestionRepository QuestionRepository => _questionRepository ??= new QuestionRepository(_context);

        public IRefreshTokenRepository RefreshTokenRepository => _refreshTokenRepository ??= new RefreshTokenRepository(_context);

        public ITestRepository TestRepository => _testRepository ??= new TestRepository(_context);

        public ITransactionRepository TransactionRepository => _transactionRepository ??= new TransactionRepository(_context);

        public IUserAnswerRepository UserAnswerRepository => _userAnswerRepository ??= new UserAnswerRepository(_context);

        public IUserNotificationRepository UserNotificationRepository => _userNotificationRepository ??= new UserNotificationRepository(_context);

        public IUserReferenceRepository UserReferenceRepository => _userReferenceRepository ??= new UserReferenceRepository(_context);

        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }
    }
}
