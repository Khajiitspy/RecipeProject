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
           .ForMember(x => x.Ingredient, opt => opt.MapFrom(src => src.Ingredient))
           .ForMember(x => x.Unit, opt => opt.MapFrom(src => src.Unit))
           .ForMember(x => x.Amount, opt => opt.MapFrom(src => src.Amount))
           .ForMember(x => x.Id, opt => opt.MapFrom(src => src.Id));

        CreateMap<IngredientUnitEntity, UnitItemModel>();
        CreateMap<RecipeEntity, RecipeItemModel>()
            .ForMember(x => x.Ingredients, opt => opt.MapFrom(
                x => x.RecipeIngredients))
            .ForMember(x => x.Category, opt => opt.MapFrom(x => x.Category));
        CreateMap<RecipeCreateModel, RecipeEntity>()
            .ForMember(x => x.RecipeIngredients, opt => opt.Ignore());

        CreateMap<RecipeUpdateModel, RecipeEntity>()
            .ForMember(x => x.RecipeIngredients, opt => opt.Ignore())
            .ForMember(x => x.Id, opt => opt.Ignore())
            .ForMember(x => x.Category, opt => opt.Ignore())
            .ForMember(x=>x.CategoryId,opt=>opt.Ignore())
            .ForAllMembers(x => x.Condition((src, dest, srcMember) => srcMember != null));
    }
}
