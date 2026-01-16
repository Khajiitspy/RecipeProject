
using Core.Model.Recipe;

namespace Core.Interfaces;

public interface IRecipeService
{
    Task<RecipeItemModel> CreateAsync(RecipeCreateModel model);
    Task<List<RecipeItemModel>> ListAsync();
    Task DeleteAsync(long id);
    Task<RecipeItemModel> UpdateAsync(RecipeUpdateModel model);
    Task<RecipeItemModel> GetByIdAsync(long id);
}
