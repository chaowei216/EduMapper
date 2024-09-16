using System.Linq.Expressions;

namespace DAL.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> Get(
            Expression<Func<T, bool>>? filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            int? pageIndex = null,
            int? pageSize = null,
            string includeProperties = "");

        Task<T?> GetByID(object id);

        void Insert(T entity);

        Task<bool> Delete(object id);

        void Delete(T entityToDelete);
        Task<bool> Update(object id, T entityToUpdate);
        void Update(T entityToUpdate);
    }
}
