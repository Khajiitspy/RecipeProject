
using AutoMapper;
using Core.Model.Recipe;
using Core.Model.Recipe.Unit;
using Domain.Entities;

namespace Core.Mappers;

public class RecipeMapper : Profile
{
    public RecipeMapper()
    {
        CreateMap<RecipeIngredientEntity, RecipeIngredientItemModel>()
    .ForMember(dest => dest.Ingredient, opt => opt.MapFrom(src => src.Ingredient))
    .ForMember(dest => dest.Unit, opt => opt.MapFrom(src => src.Unit))
    .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount));

        CreateMap<IngredientUnitEntity, UnitItemModel>();
        CreateMap<RecipeEntity, RecipeItemModel>()
            .ForMember(x => x.Ingredients, opt => opt.MapFrom(
                x => x.RecipeIngredients))
            .ForMember(x => x.Category, opt => opt.MapFrom(x => x.Category));
        

        CreateMap<RecipeCreateModel, RecipeEntity>()
            .ForMember(x => x.RecipeIngredients, opt => opt.Ignore());
    }
}
