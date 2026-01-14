using Core.Model.Recipe.Ingredient;

namespace Core.Interfaces;

public interface IIngredientService
{
    Task<List<IngredientItemModel>> ListAsync();
    Task<IngredientItemModel?> GetItemByIdAsync(long id);
    Task<IngredientItemModel> CreateAsync(IngredientCreateModel model);
    Task<IngredientItemModel> UpdateAsync(IngredientUpdateModel model);
    Task DeleteAsync(long id);
}
