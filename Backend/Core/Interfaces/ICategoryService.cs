using Core.Model.Recipe.Category;

namespace Core.Interfaces;

public interface ICategoryService
{
    Task<List<CategoryItemModel>> ListAsync();
    Task<CategoryItemModel?> GetItemByIdAsync(long id);
    Task<CategoryItemModel> CreateAsync(CategoryCreateModel model);
    Task<CategoryItemModel> UpdateAsync(CategoryUpdateModel model);
    Task DeleteAsync(long id);
}
