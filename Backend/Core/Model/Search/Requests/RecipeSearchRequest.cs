namespace Core.Model.Search.Requests
{
    public class RecipeSearchRequest : PagedRequest
    {
        public string? SearchTerm { get; set; }
        public long? UserId { get; set; }
        public long? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public long? IngredientId { get; set; }
        public string? IngredientName { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsPublished { get; set; }
    
        public bool CurrentUser { get; set; } = false; // NEW
    }
}
