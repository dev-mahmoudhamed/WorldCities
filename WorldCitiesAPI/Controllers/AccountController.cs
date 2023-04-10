using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using WorldCitiesAPI.Data;
using WorldCitiesAPI.Models;

namespace WorldCitiesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtHandler _jwtHandler;
        private IConfiguration _configuration;

        public AccountController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, JwtHandler jwtHandler, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _jwtHandler = jwtHandler;
            _configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                return Unauthorized(new LoginResult()
                {
                    Success = false,
                    Message = "Invalid Email or Password."
                });
            }

            var secToken = await _jwtHandler.GetTokenAsync(user);
            var jwt = new JwtSecurityTokenHandler().WriteToken(secToken);
            return Ok(new LoginResult()
            {
                Success = true,
                Message = "Login successful",
                Token = jwt
            });
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register(RegisterRequest registerRequest)
        {
            string role_RegisteredUser = "RegisteredUser";
            var user = await _userManager.FindByEmailAsync(registerRequest.Email);
            if (user != null)
            {
                return BadRequest(new RegisterResult()
                {
                    Success = false,
                    Message = "Email already exists"
                });
            }

            var register_User = new ApplicationUser()
            {

                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerRequest.Email,
                Email = registerRequest.Email
            };

            await _userManager.CreateAsync(register_User, registerRequest.Password);
            await _userManager.AddToRoleAsync(register_User, role_RegisteredUser);

            register_User.EmailConfirmed = true;
            register_User.LockoutEnabled = false;

            await _context.SaveChangesAsync();
            
            return Ok(new RegisterResult()
            {
                Success = true,
                Message = "Registered successfully",
            });
        }


        [HttpGet("Users")]
        public async Task<List<ApplicationUser>> getUsers()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
