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
    }
}
