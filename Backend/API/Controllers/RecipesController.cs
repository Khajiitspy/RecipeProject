using Core.Interfaces;
using Core.Model.Recipe;
using Core.Model.Recipe.Category;
using Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RecipesController(IRecipeService recipeService) : ControllerBase
    {
        [HttpPost("create")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] RecipeCreateModel model)
        {
            var recipe = await recipeService.CreateAsync(model);
            return Ok(recipe);
        }
        [HttpGet]
        public async Task<IActionResult> List()
        {
            var recipes = await recipeService.ListAsync();
            return Ok(recipes);
        }
        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetById(long id)
        {
            var recipes = await recipeService.GetByIdAsync(id);
            return Ok(recipes);
        }
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
            await recipeService.DeleteAsync(id);
            return Ok();
        }

        [HttpPut("edit")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update([FromForm] RecipeUpdateModel model)
        {
            var recipe = await recipeService.UpdateAsync(model);
            return Ok(recipe);
        }
    }
}
