using Core.Interfaces;
using Core.Model.Category;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController(ICategoryService categoryService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> List()
        {
            var model = await categoryService.ListAsync();

            return Ok(model);
        }
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] CategoryCreateModel model)
        {
            var entity = await categoryService.CreateAsync(model);
            return Ok(entity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var entity = await categoryService.DeleteAsync(id);
            return NoContent();
        }

        //[Authorize(Roles = $"{Roles.Admin}")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(int id)
        {
            var model = await categoryService.GetItemByIdAsync(id);
            if (model == null)
            {
                return NotFound();
            }
            return Ok(model);
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Edit([FromForm] CategoryUpdateModel model)
        {
            var entity = await categoryService.UpdateAsync(model);

            return Ok(entity);
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] CategorySearchModel searchModel)
        {
            try
            {
                var model = await categoryService.ListAsync(searchModel);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    invalid = ex.Message
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryNameById(int id)
        {
            var categoryName = await categoryService.GetCategoryNameById(id);
            return Ok(categoryName);
        }
    }
}
