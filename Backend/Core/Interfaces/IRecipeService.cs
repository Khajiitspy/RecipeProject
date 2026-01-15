
using Core.Model.Recipe;

namespace Core.Interfaces;

public interface IRecipeService
{
    public Task<RecipeItemModel> CreateAsync(RecipeCreateModel model);
    public Task<List<RecipeItemModel>> ListAsync();
}
