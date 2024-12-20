﻿using DAL.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DAL.Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected DataContext _context;
        protected DbSet<TEntity> _dbSet;

        public GenericRepository(DataContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
        }

        public virtual async Task<IEnumerable<TEntity>> Get(
           Expression<Func<TEntity, bool>>? filter,
           Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
           int? pageIndex = null,
           int? pageSize = null,
           string includeProperties = "")
        {
            IQueryable<TEntity> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (pageIndex.HasValue && pageSize.HasValue)
            {
                int validPageIndex = pageIndex.Value > 0 ? pageIndex.Value - 1 : 0;
                int validPageSize = pageSize.Value > 0 ? pageSize.Value : 10;

                query = query.Skip(validPageIndex * validPageSize).Take(validPageSize);
            }

            return await query.ToListAsync();
        }

        public virtual async Task<TEntity?> GetByID(object id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual void Insert(TEntity entity)
        {
            if (entity == null) return;
            _dbSet.Add(entity);
        }

        public virtual async Task<bool> Delete(object id)
        {
            TEntity? entityToDelete = await GetByID(id);
            if (entityToDelete == null) return false;
            Delete(entityToDelete);
            return true;
        }
        public virtual async Task<bool> Update(object id, TEntity entityUpdate)
        {
            TEntity? entity = await GetByID(id);
            if (entity == null) return false;
            Update(entityUpdate);
            return true;
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (_context.Entry(entityToDelete).State == EntityState.Detached)
            {
                _dbSet.Attach(entityToDelete);
            }
            _dbSet.Remove(entityToDelete);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            var trackedEntities = _context.ChangeTracker.Entries<TEntity>().ToList();
            foreach (var trackedEntity in trackedEntities)
            {
                trackedEntity.State = EntityState.Detached;
            }
            _dbSet.Attach(entityToUpdate);
            _context.Entry(entityToUpdate).State = EntityState.Modified;
        }
    }
}
