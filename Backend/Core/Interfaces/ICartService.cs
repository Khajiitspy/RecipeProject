
using Core.Model.Cart;

namespace Core.Interfaces;

public interface ICartService
{
    Task<CartItemModel> CreateAsync(CartCreateModel model);
    Task<CartItemModel> GetCartAsync();
}
