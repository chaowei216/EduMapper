using DAL.Data;
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
        private GenericRepository<ProgramTraining> _programTrainingRepository;
        private GenericRepository<Progress> _progressRepository;
        private GenericRepository<QuestionChoice> _questionChoiceRepository;
        private GenericRepository<Question> _questionRepository;
        private GenericRepository<RefreshToken> _refreshTokenRepository;
        private GenericRepository<Test> _testRepository;
        private GenericRepository<Transaction> _transactionRepository;
        private GenericRepository<UserAnswer> _userAnswerRepository;
        private GenericRepository<UserNotification> _userNotificationRepository;
        private GenericRepository<UserReference> _userReferenceRepository;

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

        public IGenericRepository<ProgramTraining> ProgramTrainingRepository
        {
            get
            {
                return _programTrainingRepository ??= new GenericRepository<ProgramTraining>(_context);
            }
        }

        public IGenericRepository<Progress> ProgressRepository
        {
            get
            {
                return _progressRepository ??= new GenericRepository<Progress>(_context);
            }
        }

        public IGenericRepository<QuestionChoice> QuestionChoiceRepository
        {
            get
            {
                return _questionChoiceRepository ??= new GenericRepository<QuestionChoice>(_context);
            }
        }

        public IGenericRepository<Question> QuestionRepository
        {
            get
            {
                return _questionRepository ??= new GenericRepository<Question>(_context);
            }
        }

        public IGenericRepository<RefreshToken> RefreshTokenRepository
        {
            get
            {
                return _refreshTokenRepository ??= new GenericRepository<RefreshToken>(_context);
            }
        }

        public IGenericRepository<Test> TestRepository
        {
            get
            {
                return _testRepository ??= new GenericRepository<Test>(_context);
            }
        }

        public IGenericRepository<Transaction> TransactionRepository
        {
            get
            {
                return _transactionRepository ??= new GenericRepository<Transaction>(_context);
            }
        }

        public IGenericRepository<UserAnswer> UserAnswerRepository
        {
            get
            {
                return _userAnswerRepository ??= new GenericRepository<UserAnswer>(_context);
            }
        }

        public IGenericRepository<UserNotification> UserNotificationRepository
        {
            get
            {
                return _userNotificationRepository ??= new GenericRepository<UserNotification>(_context);
            }
        }

        public IGenericRepository<UserReference> UserReferenceRepository
        {
            get
            {
                return _userReferenceRepository ??= new GenericRepository<UserReference>(_context);
            }
        }

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
