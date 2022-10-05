using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using FinalProject.Controllers.Services;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly DataContext _context;
        private readonly IUsernameTokenManager _usernameTokenManager;
        public AuthController(DataContext context, IUsernameTokenManager usernameTokenManager)
        {
            _context = context;
            _usernameTokenManager = usernameTokenManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            var(passwordHash, passwordSalt) = _usernameTokenManager.CreatePasswordHash(request.Password);

            if(!await _usernameTokenManager.VerifyUsername(request.UserName))
            {
                return BadRequest("An user with that username already exists");
            }

            user.Username = request.UserName;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.isAdmin = request.isAdmin;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());


        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            var creds = await _context.Users.FirstOrDefaultAsync(e => e.Username == request.UserName);

            if(creds == null)
            {
                return BadRequest("No user");
            }
            
            if (creds.Username != request.UserName)
            {
                return BadRequest("User not found.");
            }

            if (!_usernameTokenManager.VerifyPasswordHash(request.Password, creds.PasswordHash, creds.PasswordSalt))
            {
                return BadRequest("Incorrect Password");
            }

            string token = _usernameTokenManager.CreateToken(creds);

            var json = JsonConvert.SerializeObject(new { jwtToken = token });
            return Ok(json);
        }

        

        [HttpGet("getIfAdminOrUser")]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<Account>> GetByUses(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.Username == username);
            if(user == null)
            {
                return BadRequest("Username not found.");
            }
            var json = JsonConvert.SerializeObject(new { isadmin = user.isAdmin });
            return Ok(json);             
                            
        }

        [HttpGet("getUserId")]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<Account>> GetId(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.Username == username);
            if (user == null)
            {
                return BadRequest("Username not found.");
            }
            var json = JsonConvert.SerializeObject(new { userid = user.ID });
            return Ok(json);

        }


    }
}
