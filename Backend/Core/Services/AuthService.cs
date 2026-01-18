using Core.Interfaces;
using Domain.Constants;
using Domain.Data.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Core.Services
{
    public class AuthService(IHttpContextAccessor httpContextAccessor, UserManager<UserEntity> userManager) : IAuthService
    {
        public async Task<long> GetUserId()
        {
            var email = httpContextAccessor.HttpContext?.User?.Claims.First().Value;
            if (string.IsNullOrEmpty(email))
            {
                throw new UnauthorizedAccessException("User is not authenticated or email claim is missing.");
            }
            var user = await userManager.FindByEmailAsync(email);

            return user!.Id;
        }

        public async Task<string> GetUserNameAsync()
        {
            var email = httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                throw new UnauthorizedAccessException("User is not authenticated or email claim is missing.");
            }
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new UnauthorizedAccessException("User not found.");
            }
            return user.UserName!;
        }

        public async Task<List<string>> GetAdminEmailsAsync()
        {
            var admins = await userManager.GetUsersInRoleAsync(Roles.Admin);
            return admins.Select(a => a.Email!).ToList();
        }
        public async Task<string> GetUserEmailAsync()
        {
            var email = httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                throw new UnauthorizedAccessException("User is not authenticated or email claim is missing.");
            }
            return email;
        }

        public async Task<bool> IsAdminAsync()
        {
            var email = httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email)) 
                return false;

            var user = await userManager.FindByEmailAsync(email);

            if (user == null) 
                return false;
            
            return await userManager.IsInRoleAsync(user, Roles.Admin);
        }
    }
}
