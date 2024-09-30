using DAL.Models;
using DAO.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        #region Entities
        public DbSet<Center> Centers { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<MemberShip> MemberShips { get; set; }
        public DbSet<MemberShipDetail> MemberShipDetails { get; set; }
        public DbSet<Passage> Passages { get; set; }
        public DbSet<ProgramTraining> ProgramTrainings { get; set; }
        public DbSet<Progress> Progress { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<QuestionChoice> QuestionChoices { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<UserAnswer> UserAnswers { get; set; }
        public DbSet<UserReference> UserReferences { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<UserNotification> UserNotifications { get; set; }
        public DbSet<PassageSection> PassageSections { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
        public DbSet<Message> Messages { get; set; }

        #endregion

        private string GetConnectionString()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", false, true)
                .Build();

            string connectionString = configuration["ConnectionStrings:DefaultConnection"]!;
            return connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(GetConnectionString());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);

            #region M_M relationship
            modelBuilder.Entity<MemberShipDetail>()
                .HasKey(uc => uc.MemberShipDetailId);
            modelBuilder.Entity<MemberShipDetail>()
                .HasOne(uc => uc.User)
                .WithMany(uc => uc.MemberShipDetails)
                .HasForeignKey(uc => uc.UserId);
            modelBuilder.Entity<MemberShipDetail>()
                .HasOne(uc => uc.MemberShip)
                .WithMany(uc => uc.MemberShipDetails)
                .HasForeignKey(uc => uc.MemberShipId);

            modelBuilder.Entity<UserNotification>()
               .HasKey(uc => new { uc.UserId, uc.NotificationId });
            modelBuilder.Entity<UserNotification>()
                .HasOne(uc => uc.Notification)
                .WithMany(uc => uc.UserNotification)
                .HasForeignKey(uc => uc.NotificationId);
            modelBuilder.Entity<UserNotification>()
                .HasOne(uc => uc.User)
                .WithMany(uc => uc.UserNotifications)
                .HasForeignKey(uc => uc.UserId);
            #endregion
        }
    }
}
