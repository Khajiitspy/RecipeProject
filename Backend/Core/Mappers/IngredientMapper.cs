using AutoMapper;
using Core.Model.Recipe.Ingredient;
using Domain.Entities;

namespace Core.Mappers;

public class IngredientMapper : Profile
{
    public IngredientMapper()
    {
        CreateMap<IngredientEntity, IngredientItemModel>();
        CreateMap<IngredientCreateModel, IngredientEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name.Trim()));
        CreateMap<IngredientUpdateModel, IngredientEntity>();
        CreateMap<IngredientEntity, IngredientUpdateModel>()
            .ForMember(x => x.ImageFile, opt => opt.Ignore())
            .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name.Trim()));
    }
}
