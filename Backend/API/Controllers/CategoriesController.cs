using Core.Interfaces;
using Core.Model.Category;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController(ICategoryService categoryService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> List()
        {
            var model = await categoryService.ListAsync();

            return Ok(model);
        }
        [HttpPost("create")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] CategoryCreateModel model)
        {
            var category = await categoryService.CreateAsync(model);
            return Ok(category);
        }
        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetItemById(long id)
        {
            var model = await categoryService.GetItemByIdAsync(id);

            if (model == null)
            {
                return NotFound();
            }
            return Ok(model);
        }
        [HttpPut("edit")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update([FromForm] CategoryUpdateModel model)
        {
            var category = await categoryService.UpdateAsync(model);

            return Ok(category);
        }
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
            await categoryService.DeleteAsync(id);
            return Ok();
        }
    }
}
