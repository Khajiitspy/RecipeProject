using Core.Model.AdminUser;
using Core.Model.Roles;
using Core.Model.Search;
using Core.Model.Search.Requests;
using Core.Model.Seeder;

namespace Core.Interfaces
{
    public interface IUserService
    {
        Task<List<AdminUserItemModel>> GetAllUsersAsync();
        Task<PagedResult<AdminUserItemModel>> SearchUsersAsync(UserSearchRequest request);
        Task<string> SeedUsersAsync(SeedItemsModel model);
        Task<AdminUserItemModel> GetUserByIdAsync(long id);
        Task<AdminUserItemModel> UpdateAsync(AdminUserUpdateModel model);
        Task<RolesItemModel> GetRolesAsync();
    }
}
