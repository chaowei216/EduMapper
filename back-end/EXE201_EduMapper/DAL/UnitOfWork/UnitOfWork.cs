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
        private GenericRepository<ApplicationUser> _userRepository;
        private GenericRepository<MemberShip> _memberShipRepository;
        private GenericRepository<MemberShipDetail> _memberShipDetailRepository;
        private GenericRepository<Center> _centerRepository;
        private GenericRepository<Course> _courseRepository;
        private GenericRepository<Exam> _examRepository;
        private GenericRepository<Feedback> _feedbackRepository;
        private GenericRepository<Notification> _notificationRepository;
        private GenericRepository<Passage> _passageRepository;
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

        public IGenericRepository<ApplicationUser> UserRepository
        {
            get
            {
                return _userRepository ??= new GenericRepository<ApplicationUser>(_context);
            }
        }

        public IGenericRepository<MemberShip> MemberShipRepository
        {
            get
            {
                return _memberShipRepository ??= new GenericRepository<MemberShip>(_context);
            }
        }

        public IGenericRepository<MemberShipDetail> MemberShipDetailRepository
        {
            get
            {
                return _memberShipDetailRepository ??= new GenericRepository<MemberShipDetail>(_context);
            }
        }

        public IGenericRepository<Center> CenterRepository
        {
            get
            {
                return _centerRepository ??= new GenericRepository<Center>(_context);
            }
        }


        public IGenericRepository<Course> CourseRepository
        {
            get
            {
                return _courseRepository ??= new GenericRepository<Course>(_context);
            }
        }

        public IGenericRepository<Exam> ExamRepository
        {
            get
            {
                return _examRepository ??= new GenericRepository<Exam>(_context);
            }
        }

        public IGenericRepository<Feedback> FeedbackRepository
        {
            get
            {
                return _feedbackRepository ??= new GenericRepository<Feedback>(_context);
            }
        }

        public IGenericRepository<Notification> NotificationRepository
        {
            get
            {
                return _notificationRepository ??= new GenericRepository<Notification>(_context);
            }
        }

        public IGenericRepository<Passage> PassageRepository
        {
            get
            {
                return _passageRepository ??= new GenericRepository<Passage>(_context);
            }
        }

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
