
using Core.Model.Cart;

namespace Core.Interfaces;

public interface ICartService
{
    Task<CartItemModel> CreateAsync(CartCreateModel model);
    Task<CartItemModel> GetCartAsync();
    Task<List<CartRecipeModel>> GetRecipesFromCartAsync();
    Task<bool> ClearCartAsync();
    Task<CartRecipeModel> AddOneRecipeAsync(CartCreateSingleItemModel model);
}
