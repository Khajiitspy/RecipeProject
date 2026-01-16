using AutoMapper;
using Core.Interfaces;
using Core.Model.Recipe.Ingredient;
using Domain.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class IngredientService(
    AppDbContext context,
    IMapper mapper,
    IImageService imageService,
    ICacheService cache) : IIngredientService
{
    private const string ListCacheKey = "ingredients_all";
    private const string ItemCacheKeyPrefix = "ingredient_";
    private const int ListCacheTtlMinutes = 10;
    private const int ItemCacheTtlMinutes = 5;

    public async Task<IngredientItemModel> CreateAsync(IngredientCreateModel model)
    {
        var entity = mapper.Map<IngredientEntity>(model);

        if (model.ImageFile != null)
        {
            entity.Image = await imageService.SaveImageAsync(model.ImageFile);
        }

        await context.Ingredients.AddAsync(entity);
        await context.SaveChangesAsync();

        cache.Remove(ListCacheKey);

        var item = mapper.Map<IngredientItemModel>(entity);
        return item;
    }

    public async Task DeleteAsync(long id)
    {
        var entity = await context.Ingredients.SingleOrDefaultAsync(x => x.Id == id);
        if (entity == null) return;

        entity.IsDeleted = true;
        await context.SaveChangesAsync();

        cache.Remove(ListCacheKey);
        cache.Remove($"{ItemCacheKeyPrefix}{id}");
    }

    public async Task<IngredientItemModel?> GetItemByIdAsync(long id)
    {
        var key = $"{ItemCacheKeyPrefix}{id}";

        return await cache.GetOrCreateAsync(
            key,
            async () => await mapper
                .ProjectTo<IngredientItemModel>(context.Ingredients.Where(x => x.Id == id && !x.IsDeleted))
                .SingleOrDefaultAsync(),
            TimeSpan.FromMinutes(ItemCacheTtlMinutes)
        );
    }

    public async Task<List<IngredientItemModel>> ListAsync()
    {
        return await cache.GetOrCreateAsync(
            ListCacheKey,
            async () => await mapper.ProjectTo<IngredientItemModel>(
                    context.Ingredients
                        .Where(x => !x.IsDeleted)
                        .OrderBy(x => x.Id))
                .ToListAsync(),
            TimeSpan.FromMinutes(ListCacheTtlMinutes)
        );
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

        cache.Remove(ListCacheKey);
        cache.Remove($"{ItemCacheKeyPrefix}{model.Id}");

        var item = mapper.Map<IngredientItemModel>(existing);
        return item;
    }
}