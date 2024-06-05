using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Redivivus.Server.Models;
using Redivivus.Server.Services;
using System.Security.Cryptography;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace Redivivus.Server.Controllers
{


    [ApiController]
    [Route("[controller]")]

    public class UsersController: ControllerBase
    {
        public  Database db = new Database();
        public  TokenService _tokenService;

        public UsersController(TokenService tokenService)
        {
            _tokenService = tokenService;
        }

        public class RegisterPayload
        {
            public string UserName { get; set; }
            public string Password { get; set; }

            public string? Email { get; set; }
        }



        [HttpPost("register")]


        public async Task<IActionResult> Register([FromBody] RegisterPayload newUser)
        {
            var salt = GenerateSalt();
            var hashedPassword = HashPassword(newUser.Password, salt);

            var registeredUser = new User
            {
                UserName = newUser.UserName,
                Email = newUser.Email,
                PasswordHash = hashedPassword,
                Salt = salt
            };

            db.Users.Add(registeredUser);
            await db.SaveChangesAsync();

            return Ok("User registered successfully!");
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(RegisterPayload model)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.UserName == model.UserName || u.Email == model.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var hashedPassword = HashPassword(model.Password, user.Salt);

            if (user.PasswordHash != hashedPassword)
            {
                return Unauthorized("Invalid credentials");
            }

            var token = _tokenService.GenerateJwtToken(user);
            return Ok(new { token,user.Id });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await db.Users.FirstOrDefaultAsync(p => p.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        private static string GenerateSalt(int size = 32)
        {
            var saltBytes = new byte[size];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(saltBytes);
            }
            return Convert.ToBase64String(saltBytes);
        }

        private static string HashPassword(string password, string salt)
        {
            var saltBytes = Convert.FromBase64String(salt);
            var hashedBytes = KeyDerivation.Pbkdf2(
                password: password,
                salt: saltBytes,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8
            );

            return Convert.ToBase64String(hashedBytes);
        }


    }
}
