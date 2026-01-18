using AutoMapper;
using Core.Builders;
using Core.Constants;
using Core.Interfaces;
using Core.Model.Recipe.Ingredient;
using Core.Model.Search;
using Core.Model.Search.Requests;
using Core.SMTP;
using Domain.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class IngredientService(
    AppDbContext context,
    IMapper mapper,
    IImageService imageService,
    IAuthService authService,
    ISMTPService smtpService,
    ICacheService cache) : IIngredientService
{
    public async Task ApproveIngredient(long id)
    {
        var entity = context.Ingredients.SingleOrDefault(x => x.Id == id);
        if (entity == null) return;

        entity.IsApproved = true;

        await context.SaveChangesAsync();
    }

    public async Task<IngredientItemModel> CreateAsync(IngredientCreateModel model)
    {
        var isAdmin = await authService.IsAdminAsync();

        var entity = mapper.Map<IngredientEntity>(model);

        entity.IsApproved = isAdmin;

        if (model.ImageFile != null)
        {
            entity.Image = await imageService.SaveImageAsync(model.ImageFile);
        }

        if (!isAdmin)
        {
            var emails = await authService.GetAdminEmailsAsync();
            var userName = await authService.GetUserNameAsync();

            foreach (var email in emails)
            {
                if (string.IsNullOrEmpty(email))
                    continue;
                var emailModel = new EmailMessage
                {
                    To = email,
                    Subject = "New Ingredient Addition Request",
                    Body = $@"
                        <h3>New Request Submitted</h3>
                        <p>User <strong>{userName}</strong> has requested to add a new ingredient to the database:</p>
                        <ul>
                            <li><strong>Ingredient Name:</strong> {model.Name}</li>
                        </ul>
                        <p>Please log in to the admin panel to review and approve this request.</p>"
                };

                var result = await smtpService.SendEmailAsync(emailModel);
            }
        }

        await context.Ingredients.AddAsync(entity);
        await context.SaveChangesAsync();

        cache.Remove(CacheKeys.CategoryListCacheKey);

        var item = mapper.Map<IngredientItemModel>(entity);
        return item;
    }

    public async Task DeleteAsync(long id)
    {
        var entity = await context.Ingredients.SingleOrDefaultAsync(x => x.Id == id);
        if (entity == null) return;

        entity.IsDeleted = true;
        await context.SaveChangesAsync();

        cache.Remove(CacheKeys.IngredientListCacheKey);
        cache.Remove($"{CacheKeys.IngredientItemCacheKeyPrefix}{id}");
    }

    public async Task<IngredientItemModel?> GetItemByIdAsync(long id)
    {
        var key = $"{CacheKeys.IngredientItemCacheKeyPrefix}{id}";

        return await cache.GetOrCreateAsync(
            key,
            async () => await mapper
                .ProjectTo<IngredientItemModel>(context.Ingredients.Where(x => x.Id == id && !x.IsDeleted))
                .SingleOrDefaultAsync(),
            TimeSpan.FromMinutes(CacheKeys.ItemCacheTtlMinutes)
        );
    }

    public async Task<List<IngredientItemModel>> ListAsync()
    {
        return await cache.GetOrCreateAsync(
            CacheKeys.IngredientListCacheKey,
            async () => await mapper.ProjectTo<IngredientItemModel>(
                    context.Ingredients
                        .Where(x => !x.IsDeleted && x.IsApproved)
                        .OrderBy(x => x.Id))
                .ToListAsync(),
            TimeSpan.FromMinutes(CacheKeys.ListCacheTtlMinutes)
        );
    }

    public async Task<PagedResult<IngredientItemModel>> ListAsync(IngredientSearchRequest request)
    {
        var isAdmin = await authService.IsAdminAsync();

        if (!isAdmin)
        {
            request.IsApproved = true;
            request.IsDeleted = false;
        }

        var query = context.Ingredients.AsQueryable();

        var result = await new IngredientBuilder(query)
            .TakeDeleted(request.IsDeleted)
            .TakeApproved(request.IsApproved)
            .ApplyRequest(request)
            .OrderBy(r => r.Id, descending: true)
            .BuildAsync();

        var items = mapper.Map<List<IngredientItemModel>>(result.Items);

        return new PagedResult<IngredientItemModel>
        {
            Items = items,
            TotalItems = result.TotalItems,
            PageNumber = result.PageNumber,
            PageSize = result.PageSize
        };
    }

    public async Task<IngredientItemModel> UpdateAsync(IngredientUpdateModel model)
    {
        var existing = await context.Ingredients.FirstOrDefaultAsync(x => x.Id == model.Id);

        existing = mapper.Map(model, existing);

        if (model.ImageFile != null)
        {
            await imageService.DeleteImageAsync(existing.Image);
            existing.Image = await imageService.SaveImageAsync(model.ImageFile);
        }

        await context.SaveChangesAsync();

        cache.Remove(CacheKeys.IngredientListCacheKey);
        cache.Remove($"{CacheKeys.IngredientItemCacheKeyPrefix}{model.Id}");

        var item = mapper.Map<IngredientItemModel>(existing);
        return item;
    }
}