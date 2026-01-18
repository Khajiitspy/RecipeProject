using Core.Model.Search;
using Core.Model.Search.Requests;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Core.Builders;

public abstract class BaseQueryBuilder<TEntity, TBuilder>
where TEntity : class
where TBuilder : BaseQueryBuilder<TEntity, TBuilder>
{
    protected IQueryable<TEntity> Query;
    protected PagedRequest PagedRequest;

    protected BaseQueryBuilder(IQueryable<TEntity> query)
    {
        Query = query;
        PagedRequest = new PagedRequest();
    }
    public TBuilder WithPagination(PagedRequest request)
    {
        if (request != null)
        {
            PagedRequest = request;
        }
        return (TBuilder)this;
    }
    public TBuilder OrderBy<TKey>(Expression<Func<TEntity, TKey>> keySelector, bool descending = false)
    {
        Query = descending ? Query.OrderByDescending(keySelector) : Query.OrderBy(keySelector);
        return (TBuilder)this;
    }
    public TBuilder Include(params Expression<Func<TEntity, object>>[] includes)
    {
        if (includes != null)
        {
            foreach (var include in includes)
            {
                Query = Query.Include(include);
            }
        }
        return (TBuilder)this;
    }
    public async Task<PagedResult<TEntity>> BuildAsync()
    {
        var totalItems = await Query.CountAsync();

        var items = await Query
            .Skip((PagedRequest.PageNumber - 1) * PagedRequest.PageSize)
            .Take(PagedRequest.PageSize)
            .ToListAsync();

        return new PagedResult<TEntity>
        {
            Items = items,
            TotalItems = totalItems,
            PageNumber = PagedRequest.PageNumber,
            PageSize = PagedRequest.PageSize
        };
    }
}
