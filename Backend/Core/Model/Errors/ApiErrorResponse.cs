namespace Core.Model.Errors
{
    public class ApiErrorResponse
    {
        public int Status { get; init; }
        public bool IsValid { get; init; } = false;
        public Dictionary<string, string[]> Errors { get; init; } = [];
    }
}
