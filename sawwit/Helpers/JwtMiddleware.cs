using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using sawwit.Controllers;
using sawwit.Helpers;
using sawwit.Models;
using sawwit.Services;

namespace sawwit.Helpers {
    public class JwtMiddleware {
        private readonly RequestDelegate _next;
        private readonly AppSettings _appSettings;

        public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings) {
            _next = next;
            _appSettings = appSettings.Value;

        }

        public async Task Invoke(HttpContext context, IUserService userService, UserDBContext DbContext) {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            Console.WriteLine("Invoking {0}", token);
            // Console.WriteLine("User {0}", context.User);

            if(token != null) {
                attachUserToContext(context, userService, DbContext, token);
            }
            await _next(context);
        }

        private void attachUserToContext(HttpContext context, IUserService userService, UserDBContext DbContext, string token) {

            try {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                        ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken =(JwtSecurityToken) validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                var user = DbContext.users
                    .FromSqlRaw("SELECT * FROM users WHERE users.id = {0}", userId).ToList();

                // attach user to context on successful jwt validation
                context.Items["User"] = user;
                _next(context);

            } catch {
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}