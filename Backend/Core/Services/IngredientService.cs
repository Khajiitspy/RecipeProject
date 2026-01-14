using AutoMapper;
using Core.Interfaces;
using Core.Model.Recipe.Ingredient;
using Domain.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class IngredientService(AppDbContext context, IMapper mapper, 
    IImageService imageService) : IIngredientService
{
    public async Task<IngredientItemModel> CreateAsync(IngredientCreateModel model)
    {
        var entity = mapper.Map<IngredientEntity>(model);
        entity.Image = await imageService.SaveImageAsync(model.ImageFile!);
        await context.Ingredients.AddAsync(entity);
        await context.SaveChangesAsync();
        var item = mapper.Map<IngredientItemModel>(entity);
        return item;
    }

    public async Task DeleteAsync(long id)
    {
        var entity = await context.Ingredients.SingleOrDefaultAsync(x => x.Id == id);
        entity!.IsDeleted = true;
        await context.SaveChangesAsync();
    }

    public async Task<IngredientItemModel?> GetItemByIdAsync(long id)
    {
        var model = await mapper
            .ProjectTo<IngredientItemModel>(context.Ingredients.Where(x => x.Id == id))
            .SingleOrDefaultAsync();
        return model;
    }

    public async Task<List<IngredientItemModel>> ListAsync()
    {
        var model = await mapper.ProjectTo<IngredientItemModel>(context.Ingredients.Where(x => x.IsDeleted == false).OrderBy(x => x.Id)).ToListAsync();
        return model;
    }

    public async Task<IngredientItemModel> UpdateAsync(IngredientUpdateModel model)
    {
        var existing = await context.Ingredients.FirstOrDefaultAsync(x => x.Id == model.Id);

        existing = mapper.Map(model, existing);

        if (model.ImageFile != null)
        {
            await imageService.DeleteImageAsync(existing!.Image);
            existing.Image = await imageService.SaveImageAsync(model.ImageFile);
        }
        await context.SaveChangesAsync();
        var item = mapper.Map<IngredientItemModel>(existing);
        return item;
    }
}
