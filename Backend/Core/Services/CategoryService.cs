
using AutoMapper;
using Core.Interfaces;
using Core.Model.Recipe.Category;
using Domain.Data;
using Domain.Data.Entities;
using MailKit;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class CategoryService(AppDbContext context,
    IMapper mapper, IImageService imageService) : ICategoryService
{
    public async Task<CategoryItemModel> CreateAsync(CategoryCreateModel model)
    {
        var entity = mapper.Map<CategoryEntity>(model);
        entity.Image = await imageService.SaveImageAsync(model.ImageFile!);
        await context.Categories.AddAsync(entity);
        await context.SaveChangesAsync();
        var item = mapper.Map<CategoryItemModel>(entity);
        return item;
    }

    public async Task DeleteAsync(long id)
    {
        var entity = await context.Categories.SingleOrDefaultAsync(x => x.Id == id);
        entity!.IsDeleted = true;
        await context.SaveChangesAsync();
    }

    public async Task<CategoryItemModel?> GetItemByIdAsync(long id)
    {
        var model = await mapper
            .ProjectTo<CategoryItemModel>(context.Categories.Where(x => x.Id == id))
            .SingleOrDefaultAsync();
        return model;
    }

    public async Task<List<CategoryItemModel>> ListAsync()
    {
        var model = await mapper.ProjectTo<CategoryItemModel>(context.Categories.Where(x => x.IsDeleted == false).OrderBy(x => x.Id)).ToListAsync();
        return model;
    }

    public async Task<CategoryItemModel> UpdateAsync(CategoryUpdateModel model)
    {
        var existing = await context.Categories.FirstOrDefaultAsync(x => x.Id == model.Id);

        existing = mapper.Map(model, existing);

        if (model.ImageFile != null)
        {
            await imageService.DeleteImageAsync(existing!.Image);
            existing.Image = await imageService.SaveImageAsync(model.ImageFile);
        }
        await context.SaveChangesAsync();
        var item = mapper.Map<CategoryItemModel>(existing);
        return item;
    }
}
