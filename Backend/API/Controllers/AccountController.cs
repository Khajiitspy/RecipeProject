using Core.Interfaces;
using Core.Model.Account;
using Core.Model.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController(IAccountService accountService) : ControllerBase
    {
        [HttpPost]
        [EnableRateLimiting("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await accountService.LoginAsync(model);

            if (result.Success)
                return Ok(new { Token = result.Token });

            return Unauthorized(new ApiErrorResponse
            {
                Status = StatusCodes.Status401Unauthorized,
                Errors = new Dictionary<string, string[]>
                {
                    { "", new[] { result.ErrorMessage } }
                }
            });
        }

        [HttpPost]
        [EnableRateLimiting("register")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Register([FromForm] RegisterModel model)
        {
            var result = await accountService.RegisterAsync(model);

            if (result.Success)
                return Ok(new { Token = result.Token });

            return BadRequest(new ApiErrorResponse
            {
                Status = StatusCodes.Status400BadRequest,
                Errors = new Dictionary<string, string[]>
                {
                    { "", new[] { result.ErrorMessage } }
                }
            });
        }

        [HttpPost]
        [EnableRateLimiting("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequestModel model)
        {
            var token = await accountService.LoginByGoogle(model.Token);

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new ApiErrorResponse
                {
                    Status = StatusCodes.Status400BadRequest,
                    Errors = new Dictionary<string, string[]>
                    {
                        { "Email", new[] { "Помилка реєстрації" } }
                    }
                });
            }

            return Ok(new { Token = token });
        }

        [HttpPost]
        [EnableRateLimiting("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            var result = await accountService.ForgotPasswordAsync(model);

            if (result)
                return Ok();

            return BadRequest(new ApiErrorResponse
            {
                Status = StatusCodes.Status400BadRequest,
                Errors = new Dictionary<string, string[]>
                {
                    { "Email", new[] { "Користувача з такою поштою не існує" } }
                }
            });
        }

        [HttpGet]
        public async Task<IActionResult> ValidateResetToken([FromQuery] ValidateResetTokenModel model)
        {
            var isValid = await accountService.ValidateResetTokenAsync(model);
            return Ok(new { IsValid = isValid });
        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            await accountService.ResetPasswordAsync(model);
            return Ok();
        }

        [HttpPut]
        [Authorize]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update([FromForm] AccountUpdateModel model)
        {
            var result = await accountService.UpdateAsync(model);

            if (result.Success)
                return Ok(new { Token = result.Token });

            return BadRequest(new ApiErrorResponse
            {
                Status = StatusCodes.Status400BadRequest,
                Errors = new Dictionary<string, string[]>
                {
                    { "", new[] { result.ErrorMessage } }
                }
            });
        }
    }
}
