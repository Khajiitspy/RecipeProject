namespace Core.Model.Search.Requests;

public class UserSearchRequest : PagedRequest
{
    public List<string>? Roles { get; set; }
    public string? Name { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
