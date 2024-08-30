using DAL.Models;
using DAO.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        #region Entities
        public DbSet<Users> Users { get; set; }
        public DbSet<Centers> Centers { get; set; }
        public DbSet<Courses> Courses { get; set; }
        public DbSet<Exams> Exams { get; set; }
        public DbSet<MemberShips> MemberShips { get; set; }
        public DbSet<MemberShipDetails> MemberShipDetails { get; set; }
        public DbSet<Passages> Passages { get; set; }
        public DbSet<ProgramTrainings> ProgramTrainings { get; set; }
        public DbSet<Progress> Progresses { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<QuestionChoices> QuestionChoices { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Tests> Tests { get; set; }
        public DbSet<UserAnswers> UserAnswers { get; set; }
        public DbSet<UserReferences> UserReferences { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Feedbacks> Feedbacks { get; set; }
        public DbSet<Notifications> Notifications { get; set; }
        public DbSet<Transactions> Transactions { get; set; }
        public DbSet<UserNotifications> UserNotifications { get; set; }

        #endregion

        private string GetConnectionString()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", false, true)
                .Build();
            string connectionString = configuration["ConnectionStrings:DefaultConnection"];
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

            #region M_M relationship
            modelBuilder.Entity<UserAnswers>()
                .HasKey(uc => new { uc.UserId, uc.QuestionId });
            modelBuilder.Entity<UserAnswers>()
                .HasOne(uc => uc.User)
                .WithMany(uc => uc.UserAnswers)
                .HasForeignKey(uc => uc.UserId);
            modelBuilder.Entity<UserAnswers>()
                .HasOne(uc => uc.Question)
                .WithMany(uc => uc.UserAnswers)
                .HasForeignKey(uc => uc.QuestionId);

            modelBuilder.Entity<MemberShipDetails>()
                .HasKey(uc => new { uc.UserId, uc.MemberShipId });
            modelBuilder.Entity<MemberShipDetails>()
                .HasOne(uc => uc.User)
                .WithMany(uc => uc.MemberShipDetails)
                .HasForeignKey(uc => uc.UserId);
            modelBuilder.Entity<MemberShipDetails>()
                .HasOne(uc => uc.MemberShip)
                .WithMany(uc => uc.MemberShipDetails)
                .HasForeignKey(uc => uc.MemberShipId);

            modelBuilder.Entity<UserNotifications>()
               .HasKey(uc => new { uc.UserId, uc.NotificationId });
            modelBuilder.Entity<UserNotifications>()
                .HasOne(uc => uc.Notification)
                .WithMany(uc => uc.UserNotification)
                .HasForeignKey(uc => uc.NotificationId);
            modelBuilder.Entity<UserNotifications>()
                .HasOne(uc => uc.User)
                .WithMany(uc => uc.UserNotifications)
                .HasForeignKey(uc => uc.UserId);
            #endregion
        }
    }
}
