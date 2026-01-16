
using Core.Model.Recipe;
using Core.Model.Recipe.Unit;

namespace Core.Interfaces;

public interface IRecipeService
{
    Task<RecipeItemModel> CreateAsync(RecipeCreateModel model);
    Task<List<RecipeItemModel>> ListAsync();
    Task DeleteAsync(long id);
    Task<RecipeItemModel> UpdateAsync(RecipeUpdateModel model);
    Task<RecipeItemModel> GetByIdAsync(long id);
    Task<List<UnitItemModel>> GetUnitsAsync();
}
