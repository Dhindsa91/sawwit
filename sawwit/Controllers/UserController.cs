using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sawwit.Models;
using BC = BCrypt.Net.BCrypt;
using Microsoft.AspNetCore.Http;
using sawwit.Helpers;
using sawwit.Services;

namespace sawwit.Controllers {

    [Route("api/[controller]")]
    public class UserController : Controller {

        private readonly UserDBContext _context;
        private IUserService _userService;

        public UserController(UserDBContext context, IUserService userService) {
            _context = context;
            _userService = userService;
        }

        /* The Task class represents a single operation that does not return a value and that usually executes asynchronously.
        [FromBody] so it will not try to read from url */
        /** Register Handler **/
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user) {
            try {
                //Check if user already exists
                var alreadyExists = await _context.users
                    .FromSqlRaw("SELECT * FROM users WHERE users.email = {0}", user.email).ToListAsync();

                if(alreadyExists.Count() > 0) {
                    var errorResponse = new {
                        error = "User already exists.",
                        ok = false
                    };
                    return Json(errorResponse);

                } else {

                    Console.WriteLine("Inserting a new User {0}", user.email);

                    User newUser = new User();
                    DateTime currentDateTime = DateTime.Now;

                    newUser = user;
                    newUser.created = currentDateTime;
                    newUser.password = BC.HashPassword(user.password);

                    _context.Add(newUser);
                    _context.SaveChanges();

                    return Json(newUser);
                }

            } catch(Exception e) {

                //Error
                Console.WriteLine("Error Stack {0}", e.Message);
                Console.WriteLine("Error Stack {0}", e);

                var errorResponse = new {
                    error = true,
                    ok = false,
                    errorMessage = e.Message
                };
                return Json(errorResponse);
            }
        }

        /** Login Handler **/
        [HttpPost("login")]
        public IActionResult Login([FromBody] User user) {
            try {
                var loginAccount = _context.users
                    .FromSqlRaw("SELECT * FROM users WHERE users.email = {0}", user.email).FirstOrDefault<User>();

                if(loginAccount == null) {

                    var errorResponse = new {
                    error = "User does not exist.",
                    ok = false
                    };

                    return Json(errorResponse);

                } else {

                    if(BC.Verify(user.password, loginAccount.password)) {
                        var response = _userService.Authenticate(user);
                        response.password = "";
                        response.id = loginAccount.id;
                        return Json(response);

                    } else {
                        var errorResponse = new {
                            error = "Invalid Password",
                            ok = false
                        };

                        return Json(errorResponse);

                    }
                }
            } catch(Exception e) {

                //Error
                Console.WriteLine("Error Stack {0}", e.Message);
                Console.WriteLine("Error Stack {0}", e);

                var errorResponse = new {
                    error = true,
                    ok = false,
                    errorMessage = e.Message
                };
                return Json(errorResponse);
            }

        }

        [HttpGet("valid")]
        [Authorize]
        public IActionResult valid() {
            return Json(new { test = true });
        }
    }
}