namespace Core.Model.Search.Requests
{
    public class CategorySearchRequest : PagedRequest
    {
        public string? SearchTerm { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
