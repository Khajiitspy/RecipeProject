using Core.Model.Recipe.Ingredient;
using Core.Model.Search;
using Core.Model.Search.Requests;

namespace Core.Interfaces;

public interface IIngredientService
{
    Task<List<IngredientItemModel>> ListAsync();
    Task<PagedResult<IngredientItemModel>> ListAsync(IngredientSearchRequest request);
    Task<IngredientItemModel?> GetItemByIdAsync(long id);
    Task<IngredientItemModel> CreateAsync(IngredientCreateModel model);
    Task<IngredientItemModel> UpdateAsync(IngredientUpdateModel model);
    Task DeleteAsync(long id);
    Task ApproveIngredient(long id);
}
