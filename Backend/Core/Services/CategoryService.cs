using AutoMapper;
using Core.Builders;
using Core.Constants;
using Core.Interfaces;
using Core.Model.Recipe.Category;
using Core.Model.Search;
using Core.Model.Search.Requests;
using Domain.Data;
using Domain.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class CategoryService(
        AppDbContext context,
        IMapper mapper,
        IImageService imageService,
        IAuthService authService,
        ICacheService cache) : ICategoryService
{
    

    public async Task<CategoryItemModel> CreateAsync(CategoryCreateModel model)
    {
        var entity = mapper.Map<CategoryEntity>(model);

        if (model.ImageFile != null)
        {
            entity.Image = await imageService.SaveImageAsync(model.ImageFile);
        }

        await context.Categories.AddAsync(entity);
        await context.SaveChangesAsync();

        cache.Remove(CacheKeys.CategoryListCacheKey);

        return mapper.Map<CategoryItemModel>(entity);
    }
    public async Task<CategoryItemModel> UpdateAsync(CategoryUpdateModel model)
    {
        var existing = await context.Categories.FirstOrDefaultAsync(x => x.Id == model.Id);

        existing = mapper.Map(model, existing);

        if (model.ImageFile != null)
        {
            await imageService.DeleteImageAsync(existing.Image);
            existing.Image = await imageService.SaveImageAsync(model.ImageFile);
        }

        await context.SaveChangesAsync();

        cache.Remove(CacheKeys.CategoryListCacheKey);
        cache.Remove($"{CacheKeys.CategoryItemCacheKeyPrefix}{model.Id}");

        return mapper.Map<CategoryItemModel>(existing);
    }
    public async Task DeleteAsync(long id)
    {
        var entity = await context.Categories.SingleOrDefaultAsync(x => x.Id == id);
        if (entity == null) return;

        entity.IsDeleted = true;
        await context.SaveChangesAsync();

        cache.Remove(CacheKeys.CategoryListCacheKey);
        cache.Remove($"{CacheKeys.CategoryItemCacheKeyPrefix}{id}");
    }
    public async Task<CategoryItemModel?> GetItemByIdAsync(long id)
    {
        var key = $"{CacheKeys.CategoryItemCacheKeyPrefix}{id}";
        return await cache.GetOrCreateAsync(
            key,
            async () => await mapper
                .ProjectTo<CategoryItemModel>(context.Categories.Where(x => x.Id == id && !x.IsDeleted))
                .SingleOrDefaultAsync(),
            TimeSpan.FromMinutes(CacheKeys.ItemCacheTtlMinutes)
        );
    }
    public async Task<List<CategoryItemModel>> ListAsync()
    {
        return await cache.GetOrCreateAsync(
            CacheKeys.CategoryListCacheKey,
            async () => await mapper.ProjectTo<CategoryItemModel>(
                    context.Categories
                           .Where(x => !x.IsDeleted)
                           .OrderBy(x => x.Id))
                .ToListAsync(),
            TimeSpan.FromMinutes(CacheKeys.ListCacheTtlMinutes)
        );
    }
    public async Task<PagedResult<CategoryItemModel>> ListAsync(CategorySearchRequest request)
    {
        var isAdmin = await authService.IsAdminAsync();

        if (!isAdmin)
            request.IsDeleted = false;

        var query = context.Categories.AsQueryable();

        var result = await new CategoryBuilder(query)
            .TakeDeleted(request.IsDeleted)
            .ApplyRequest(request)
            .OrderBy(c => c.Name)
            .BuildAsync();

        var items = mapper.Map<List<CategoryItemModel>>(result.Items);

        return new PagedResult<CategoryItemModel>
        {
            Items = items,
            TotalItems = result.TotalItems,
            PageNumber = result.PageNumber,
            PageSize = result.PageSize
        };
    }
}