
using AutoMapper;
using Core.Model.Cart;
using Domain.Entities;

namespace Core.Mappers;

public class CartMapper : Profile
{
    public CartMapper()
    {
        CreateMap<CartRecipeEntity, CartRecipeModel>()
            .ForMember(x => x.RecipeName, opt => opt.MapFrom(x => x.Recipe!.Name))
            .ForMember(x => x.RecipeImage, opt => opt.MapFrom(x => x.Recipe!.Image));
       
    }
}
