namespace Core.Model.Search.Requests
{
    public class IngredientSearchRequest : PagedRequest
    {
        public string? Name { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
