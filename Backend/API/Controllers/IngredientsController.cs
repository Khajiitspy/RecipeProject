using Core.Interfaces;
using Core.Model.Recipe.Ingredient;
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
        [HttpPost("create")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] IngredientCreateModel model)
        {
            var category = await ingredientService.CreateAsync(model);
            return Ok(category);
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
