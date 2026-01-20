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
    }
}
