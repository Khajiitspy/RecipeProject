using Core.Model.Search.Requests;
using Domain.Data.Entities;

namespace Core.Builders
{
    public class CategoryBuilder : BaseQueryBuilder<CategoryEntity, CategoryBuilder>
    {
        public CategoryBuilder(IQueryable<CategoryEntity> query) : base(query) { }

        public CategoryBuilder ApplyRequest(CategorySearchRequest request)
        {
            WithPagination(request);

            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                var term = request.SearchTerm.ToLower();
                Query = Query.Where(c => c.Name.ToLower().Contains(term)
                                      || c.Slug.ToLower().Contains(term));
            }

            return this;
        }

        public CategoryBuilder TakeDeleted(bool? isDeleted = null)
        {
            if (!isDeleted.HasValue)
                return this;
            Query = Query.Where(r => r.IsDeleted == isDeleted);
            return this;
        }
    }
}
