using Core.Interfaces;
using Core.Model.Cart;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController(ICartService cartService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var cart = await cartService.GetCartAsync();
            return Ok(cart);
        }
        [HttpPut]
        public async Task<IActionResult> CreateCart(CartCreateModel model)
        {
            var cart = await cartService.CreateAsync(model);
            return Ok(cart);
        }
        [HttpGet("recipes")]
        public async Task<IActionResult> GetRecipesFromCart()
        {
            var recipes = await cartService.GetRecipesFromCartAsync();
            return Ok(recipes);
        }
        [HttpDelete("clear")]
        public async Task<IActionResult> ClearCart()
        {
            var res = await cartService.ClearCartAsync();
            return Ok(res);
        }
        [HttpPost("add-recipe")]
        public async Task<IActionResult> AddOneRecipe(CartCreateSingleItemModel model)
        {
            var cart = await cartService.AddOneRecipeAsync(model);
            return Ok(cart);
        }
    }
}
