using Core.Model.Search.Requests;
using Domain.Entities;

namespace Core.Builders
{
    public class IngredientBuilder : BaseQueryBuilder<IngredientEntity, IngredientBuilder>
    {
        public IngredientBuilder(IQueryable<IngredientEntity> query) : base(query) { }

        public IngredientBuilder ApplyRequest(IngredientSearchRequest request)
        {
            WithPagination(request);

            if (!string.IsNullOrWhiteSpace(request.Name))
            {
                Query = Query.Where(i => i.Name.ToLower().Contains(request.Name.ToLower()));
            }

            return this;
        }

        public IngredientBuilder TakeDeleted(bool? isDeleted = true)
        {
            Query = isDeleted.HasValue && isDeleted.Value
                ? Query.Where(i => i.IsDeleted)
                : Query.Where(i => !i.IsDeleted);
            return this;
        }

        public IngredientBuilder TakeApproved(bool? isApproved = true)
        {
            Query = isApproved.HasValue && isApproved.Value
                ? Query.Where(i => i.IsApproved)
                : Query.Where(i => !i.IsApproved);
            return this;
        }
    }
}
