using DAL.Data;
using DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace EXE201_EduMapper.Extension
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddUnitOfWork(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            return services;
        }

        public static IServiceCollection AddDatabase(this IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options => options.UseSqlServer(GetConnectionString()));
            return services;
        }

        private static string GetConnectionString()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", false, true)
                .Build();
            string connectionString = configuration["ConnectionStrings:DefaultConnection"];
            return connectionString;
        }
    }
}
