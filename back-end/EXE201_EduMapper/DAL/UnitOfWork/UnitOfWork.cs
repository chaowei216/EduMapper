using DAL.Data;
using DAL.Models;
using DAL.Repository;
using DAO.Models;

namespace DAL.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private DataContext _context;
        private GenericRepository<Users> _userRepository;
        private GenericRepository<MemberShips> _memberShipRepository;
        private GenericRepository<MemberShipDetails> _memberShipDetailRepository;
        private GenericRepository<Centers> _centerRepository;
        private GenericRepository<Courses> _courseRepository;
        private GenericRepository<Exams> _examRepository;
        private GenericRepository<Feedbacks> _feedbackRepository;
        private GenericRepository<Notifications> _notificationRepository;
        private GenericRepository<Passages> _passageRepository;
        private GenericRepository<ProgramTrainings> _programTrainingRepository;
        private GenericRepository<Progress> _progressRepository;
        private GenericRepository<QuestionChoices> _questionChoiceRepository;
        private GenericRepository<Questions> _questionRepository;
        private GenericRepository<RefreshToken> _refreshTokenRepository;
        private GenericRepository<Roles> _roleRepository;
        private GenericRepository<Tests> _testRepository;
        private GenericRepository<Transactions> _transactionRepository;
        private GenericRepository<UserAnswers> _userAnswerRepository;
        private GenericRepository<UserNotifications> _userNotificationRepository;
        private GenericRepository<UserReferences> _userReferenceRepository;

        public IGenericRepository<Users> UserRepository
        {
            get
            {
                return _userRepository ??= new GenericRepository<Users>(_context);
            }
        }

        public IGenericRepository<MemberShips> MemberShipRepository
        {
            get
            {
                return _memberShipRepository ??= new GenericRepository<MemberShips>(_context);
            }
        }

        public IGenericRepository<MemberShipDetails> MemberShipDetailRepository
        {
            get
            {
                return _memberShipDetailRepository ??= new GenericRepository<MemberShipDetails>(_context);
            }
        }

        public IGenericRepository<Centers> CenterRepository
        {
            get
            {
                return _centerRepository ??= new GenericRepository<Centers>(_context);
            }
        }


        public IGenericRepository<Courses> CourseRepository
        {
            get
            {
                return _courseRepository ??= new GenericRepository<Courses>(_context);
            }
        }

        public IGenericRepository<Exams> ExamRepository
        {
            get
            {
                return _examRepository ??= new GenericRepository<Exams>(_context);
            }
        }

        public IGenericRepository<Feedbacks> FeedbackRepository
        {
            get
            {
                return _feedbackRepository ??= new GenericRepository<Feedbacks>(_context);
            }
        }

        public IGenericRepository<Notifications> NotificationRepository
        {
            get
            {
                return _notificationRepository ??= new GenericRepository<Notifications>(_context);
            }
        }

        public IGenericRepository<Passages> PassageRepository
        {
            get
            {
                return _passageRepository ??= new GenericRepository<Passages>(_context);
            }
        }

        public IGenericRepository<ProgramTrainings> ProgramTrainingRepository
        {
            get
            {
                return _programTrainingRepository ??= new GenericRepository<ProgramTrainings>(_context);
            }
        }

        public IGenericRepository<Progress> ProgressRepository
        {
            get
            {
                return _progressRepository ??= new GenericRepository<Progress>(_context);
            }
        }

        public IGenericRepository<QuestionChoices> QuestionChoiceRepository
        {
            get
            {
                return _questionChoiceRepository ??= new GenericRepository<QuestionChoices>(_context);
            }
        }

        public IGenericRepository<Questions> QuestionRepository
        {
            get
            {
                return _questionRepository ??= new GenericRepository<Questions>(_context);
            }
        }

        public IGenericRepository<RefreshToken> RefreshTokenRepository
        {
            get
            {
                return _refreshTokenRepository ??= new GenericRepository<RefreshToken>(_context);
            }
        }

        public IGenericRepository<Roles> RoleRepository
        {
            get
            {
                return _roleRepository ??= new GenericRepository<Roles>(_context);
            }
        }

        public IGenericRepository<Tests> TestRepository
        {
            get
            {
                return _testRepository ??= new GenericRepository<Tests>(_context);
            }
        }

        public IGenericRepository<Transactions> TransactionRepository
        {
            get
            {
                return _transactionRepository ??= new GenericRepository<Transactions>(_context);
            }
        }

        public IGenericRepository<UserAnswers> UserAnswerRepository
        {
            get
            {
                return _userAnswerRepository ??= new GenericRepository<UserAnswers>(_context);
            }
        }

        public IGenericRepository<UserNotifications> UserNotificationRepository
        {
            get
            {
                return _userNotificationRepository ??= new GenericRepository<UserNotifications>(_context);
            }
        }

        public IGenericRepository<UserReferences> UserReferenceRepository
        {
            get
            {
                return _userReferenceRepository ??= new GenericRepository<UserReferences>(_context);
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
