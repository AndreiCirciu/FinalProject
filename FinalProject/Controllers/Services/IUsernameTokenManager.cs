
namespace FinalProject.Controllers.Services
{
    public interface IUsernameTokenManager
    {
        (byte[] passwordHash, byte[] passwordSalt) CreatePasswordHash(string password);
        string CreateToken(User user);
        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
        Task<bool> VerifyUsername(string username);
    }
}