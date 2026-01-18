using Core.Interfaces;
using Core.Model.Recipe.Ingredient;
using Core.Model.Search.Requests;
using Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientsController(IIngredientService ingredientService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> List()
        {
            var model = await ingredientService.ListAsync();

            return Ok(model);
        }

        [HttpGet("search")]
        public async Task<IActionResult> List([FromQuery] IngredientSearchRequest request)
        {
            var model = await ingredientService.ListAsync(request);
            return Ok(model);
        }

        [HttpPost("create")]
        [Authorize]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] IngredientCreateModel model)
        {
            var category = await ingredientService.CreateAsync(model);
            return Ok(category);
        }

        [HttpPut("approve{id:long}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Approve(long id)
        {
            await ingredientService.ApproveIngredient(id);
            return Ok();
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetItemById(long id)
        {
            var model = await ingredientService.GetItemByIdAsync(id);

            if (model == null)
            {
                return NotFound();
            }
            return Ok(model);
        }
        [HttpPut("edit")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update([FromForm] IngredientUpdateModel model)
        {
            var category = await ingredientService.UpdateAsync(model);

            return Ok(category);
        }
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
            await ingredientService.DeleteAsync(id);
            return Ok();
        }
    }
}
