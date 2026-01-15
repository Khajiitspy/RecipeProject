
using AutoMapper;
using Core.Interfaces;
using Core.Model.Recipe.Category;
using Domain.Data;
using Domain.Data.Entities;
using MailKit;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class CategoryService(
        AppDbContext context,
        IMapper mapper,
        IImageService imageService,
        ICacheService cache) : ICategoryService
{
    private const string ListCacheKey = "categories_all";
    private const string ItemCacheKeyPrefix = "category_";
    private const int ListCacheTtlMinutes = 10;
    private const int ItemCacheTtlMinutes = 5;

    public async Task<CategoryItemModel> CreateAsync(CategoryCreateModel model)
    {
        var entity = mapper.Map<CategoryEntity>(model);

        if (model.ImageFile != null)
        {
            entity.Image = await imageService.SaveImageAsync(model.ImageFile);
        }

        await context.Categories.AddAsync(entity);
        await context.SaveChangesAsync();

        cache.Remove(ListCacheKey);

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

        cache.Remove(ListCacheKey);
        cache.Remove($"{ItemCacheKeyPrefix}{model.Id}");

        return mapper.Map<CategoryItemModel>(existing);
    }
    public async Task DeleteAsync(long id)
    {
        var entity = await context.Categories.SingleOrDefaultAsync(x => x.Id == id);
        if (entity == null) return;

        entity.IsDeleted = true;
        await context.SaveChangesAsync();

        cache.Remove(ListCacheKey);
        cache.Remove($"{ItemCacheKeyPrefix}{id}");
    }
    public async Task<CategoryItemModel?> GetItemByIdAsync(long id)
    {
        var key = $"{ItemCacheKeyPrefix}{id}";
        return await cache.GetOrCreateAsync(
            key,
            async () => await mapper
                .ProjectTo<CategoryItemModel>(context.Categories.Where(x => x.Id == id && !x.IsDeleted))
                .SingleOrDefaultAsync(),
            TimeSpan.FromMinutes(ItemCacheTtlMinutes)
        );
    }
    public async Task<List<CategoryItemModel>> ListAsync()
    {
        return await cache.GetOrCreateAsync(
            ListCacheKey,
            async () => await mapper.ProjectTo<CategoryItemModel>(
                    context.Categories
                           .Where(x => !x.IsDeleted)
                           .OrderBy(x => x.Id))
                .ToListAsync(),
            TimeSpan.FromMinutes(ListCacheTtlMinutes)
        );
    }
}