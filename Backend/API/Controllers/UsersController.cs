using Core.Interfaces;
using Core.Model.AdminUser;
using Core.Model.Search.Requests;
using Core.Model.Seeder;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserService userService) : ControllerBase
    {
        [HttpGet("list")]
        public async Task<IActionResult> GetAllUsers()
        {
            var model = await userService.GetAllUsersAsync();

            return Ok(model);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] UserSearchRequest request)
        {
            var result = await userService.SearchUsersAsync(request);
            return Ok(result);
        }

        [HttpGet("seed")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SeedUsers([FromQuery] SeedItemsModel model)
        {
            var result = await userService.SeedUsersAsync(model);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(long id)
        {
            var user = await userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("edit")]
        [Consumes("multipart/form-data")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUser([FromForm] AdminUserUpdateModel model)
        {
            var result = await userService.UpdateAsync(model);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await userService.GetRolesAsync();
            return Ok(roles);
        }
    }
}
