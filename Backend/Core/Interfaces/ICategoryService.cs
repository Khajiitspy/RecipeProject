using Core.Model.Recipe.Category;
using Core.Model.Search;
using Core.Model.Search.Requests;

namespace Core.Interfaces;

public interface ICategoryService
{
    Task<List<CategoryItemModel>> ListAsync();
    Task<PagedResult<CategoryItemModel>> ListAsync(CategorySearchRequest request);
    Task<CategoryItemModel?> GetItemByIdAsync(long id);
    Task<CategoryItemModel> CreateAsync(CategoryCreateModel model);
    Task<CategoryItemModel> UpdateAsync(CategoryUpdateModel model);
    Task DeleteAsync(long id);
}
