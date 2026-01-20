using AutoMapper;
using Core.Interfaces;
using Core.Model.Seeder;
using Domain.Constants;
using Domain.Data;
using Domain.Data.Entities;
using Domain.Data.Entities.Identity;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

namespace Core.Services
{
    public class DbSeederService(IServiceProvider serviceProvider) : IDbSeederService
    {
        public async Task SeedData()
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
            var mapper = scope.ServiceProvider.GetRequiredService<IMapper>();
            var imageService = scope.ServiceProvider.GetRequiredService<IImageService>();

            context.Database.Migrate();

            if (!context.Categories.Any())
            {
                var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Categories.json");

                if (File.Exists(jsonFile))
                {
                    var jsonData = await File.ReadAllTextAsync(jsonFile);
                    try
                    {
                        var categories = JsonSerializer.Deserialize<List<SeederCategoryModel>>(jsonData);
                        var entityItems = mapper.Map<List<CategoryEntity>>(categories);
                        foreach (var entity in entityItems)
                        {
                            try
                            {
                                entity.Image = await imageService.SaveImageFromUrlAsync(entity.Image);
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine("Bad url", ex.Message);
                            }

                        }
                        await context.Categories.AddRangeAsync(entityItems);
                        await context.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error Json Parse Data", ex.Message);
                    }
                }
                else
                {
                    Console.WriteLine("Not found file Categories.json");
                }
            }

            if (!context.Roles.Any())
            {
                foreach (var roleName in Roles.AllRoles)
                {
                    var result = await roleManager.CreateAsync(new(roleName));
                    if (!result.Succeeded)
                    {
                        Console.WriteLine("Error Create Role {0}", roleName);
                    }
                }
            }

            if (!context.Users.Any())
            {
                var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Users.json");
                if (File.Exists(jsonFile))
                {
                    var jsonData = await File.ReadAllTextAsync(jsonFile);
                    try
                    {
                        var users = JsonSerializer.Deserialize<List<SeederUserModel>>(jsonData);
                        foreach (var user in users)
                        {
                            var entity = mapper.Map<UserEntity>(user);
                            entity.UserName = user.Email;
                            entity.Image = await imageService.SaveImageFromUrlAsync(user.Image);
                            var result = await userManager.CreateAsync(entity, user.Password);
                            if (!result.Succeeded)
                            {
                                Console.WriteLine("Error Create User {0}", user.Email);
                                continue;
                            }
                            foreach (var role in user.Roles)
                            {
                                if (await roleManager.RoleExistsAsync(role))
                                {
                                    await userManager.AddToRoleAsync(entity, role);
                                }
                                else
                                {
                                    Console.WriteLine("Not Found Role {0}", role);
                                }
                            }
                        }

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error Json Parse Data {0}", ex.Message);
                    }
                }
                else
                {
                    Console.WriteLine("Not Found File Users.json");
                }
            }

            if (!context.Ingredients.Any())
            {
                var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Ingredients.json");

                if (File.Exists(jsonFile))
                {
                    var jsonData = await File.ReadAllTextAsync(jsonFile);
                    try
                    {
                        var items = JsonSerializer.Deserialize<List<SeederIngredientModel>>(jsonData);
                        var entityItems = mapper.Map<List<IngredientEntity>>(items);
                        foreach (var entity in entityItems)
                        {
                            try
                            {
                                entity.Image = await imageService.SaveImageFromUrlAsync(entity.Image);
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine("Error Json Parse Data", ex.Message);
                            }
                        }
                        await context.Ingredients.AddRangeAsync(entityItems);
                        await context.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error Json Parse Data", ex.Message);
                    }
                }
                else
                {
                    Console.WriteLine("Not found file Ingredients.json");
                }
            }

            if (!context.IngredientUnits.Any())
            {
                var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "IngredientUnits.json");

                if (File.Exists(jsonFile))
                {
                    var jsonData = await File.ReadAllTextAsync(jsonFile);
                    try
                    {
                        var items = JsonSerializer.Deserialize<List<SeederIngredientUnitModel>>(jsonData);
                        var entityItems = mapper.Map<List<IngredientUnitEntity>>(items);

                        await context.IngredientUnits.AddRangeAsync(entityItems);
                        await context.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error Json Parse Data", ex.Message);
                    }
                }
                else
                {
                    Console.WriteLine("Not found file IngredientUnits.json");
                }
            }
        }
    }
}
