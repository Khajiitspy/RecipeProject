using Core.Model.Search.Requests;
using Domain.Data.Entities;
using Domain.Data.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Core.Builders;

public class AdminUserBuilder : BaseQueryBuilder<UserEntity, AdminUserBuilder>
{
    public AdminUserBuilder(IQueryable<UserEntity> query) : base(query)
    {
    }

    public AdminUserBuilder ApplyRequest(UserSearchRequest request)
    {
        WithPagination(request);

        if (!string.IsNullOrWhiteSpace(request.Name))
        {
            var nameFilter = request.Name.Trim().ToLower().Normalize();

            Query = Query.Where(u =>
                (u.FirstName + " " + u.LastName).ToLower().Contains(nameFilter) ||
                u.FirstName!.ToLower().Contains(nameFilter) ||
                u.LastName!.ToLower().Contains(nameFilter));
        }

        if (request.StartDate != null)
        {
            Query = Query.Where(u => u.DateCreated >= request.StartDate);
        }

        if (request.EndDate != null)
        {
            Query = Query.Where(u => u.DateCreated <= request.EndDate);
        }

        if (request.Roles != null && request.Roles.Any())
        {
            Query = Query.Where(u =>
                u.UserRoles!.Any(ur => request.Roles.Contains(ur.Role.Name!)));
        }

        return this;
    }
}