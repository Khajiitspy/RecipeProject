
using AutoMapper;
using Core.Model.Category;
using Core.Model.Seeder;
using Domain.Data.Entities;

namespace Core.Mappers;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<SeederCategoryModel, CategoryEntity>();
        CreateMap<CategoryEntity, CategoryItemModel>();
        CreateMap<CategoryCreateModel, CategoryEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name.Trim()))
            .ForMember(x => x.Slug, opt => opt.MapFrom(x => x.Slug.Trim()));
        CreateMap<CategoryUpdateModel, CategoryEntity>();
        CreateMap<CategoryEntity, CategoryUpdateModel>()
            .ForMember(x => x.ImageFile, opt => opt.Ignore())
            .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name.Trim()))
            .ForMember(x => x.Slug, opt => opt.MapFrom(x => x.Slug.Trim()));
    }
}
