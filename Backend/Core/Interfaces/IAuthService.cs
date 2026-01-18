namespace Core.Interfaces
{
    public interface IAuthService
    {
        Task<long> GetUserId();
        Task<string> GetUserNameAsync();
        Task<List<string>> GetAdminEmailsAsync();
        Task<string> GetUserEmailAsync();
        Task<bool> IsAdminAsync();
    }
}
