using Core.Model.Search.Requests;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Builders
{
    public class RecipeBuilder : BaseQueryBuilder<RecipeEntity, RecipeBuilder>
    {
        public RecipeBuilder(IQueryable<RecipeEntity> query) : base(query) { }

        public RecipeBuilder ApplyRequest(RecipeSearchRequest request)
        {
            IncludeIngredients();

            WithPagination(request);

            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                var term = request.SearchTerm.ToLower();
                Query = Query.Where(r => r.Name.ToLower().Contains(term)
                                      || r.Instruction.ToLower().Contains(term)
                                      || r.Slug.ToLower().Contains(term));
            }
            if (request.CategoryId.HasValue)
            {
                Query = Query.Where(r => r.CategoryId == request.CategoryId.Value);
            }

            if (!string.IsNullOrWhiteSpace(request.CategoryName))
            {
                var catName = request.CategoryName.ToLower();
                Query = Query.Where(r => r.Category != null && r.Category.Name.ToLower().Contains(catName));
            }
            if (request.UserId.HasValue)
            {
                Query = Query.Where(r => r.UserId == request.UserId.Value);
            }

            if (request.IngredientId.HasValue)
            {
                Query = Query.Where(r => r.RecipeIngredients != null
                    && r.RecipeIngredients.Any(ri => ri.IngredientId == request.IngredientId.Value));
            }

            if (!string.IsNullOrWhiteSpace(request.IngredientName))
            {
                var ingName = request.IngredientName.ToLower();
                Query = Query.Where(r => r.RecipeIngredients != null
                    && r.RecipeIngredients.Any(ri => ri.Ingredient != null && ri.Ingredient.Name.ToLower().Contains(ingName)));
            }

            return this;
        }

        public RecipeBuilder TakeDeleted(bool? isDeleted = true)
        {
            Query = isDeleted.HasValue && isDeleted.Value
                ? Query.Where(r => r.IsDeleted)
                : Query.Where(r => !r.IsDeleted);
            return this;
        }

        public RecipeBuilder TakePublished (bool? isPublish = true)
        {
            Query = isPublish.HasValue && isPublish.Value
                ? Query.Where(r => r.IsPublished)
                : Query.Where(r => !r.IsPublished);
            return this;
        }

        public RecipeBuilder IncludeIngredients()
        {
            Query = Query
                .Include(r => r.Category)
                .Include(r => r.RecipeIngredients!)
                    .ThenInclude(ri => ri.Ingredient);

            return this;
        }
    }
}
