using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using sawwit.Helpers;
using sawwit.Models;

namespace sawwit.Services {

    public interface IUserService {
        User Authenticate(User model);

    }

    public class UserService : IUserService {

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings) {
            _appSettings = appSettings.Value;
        }

        public User Authenticate(User user) {

            // return null if user not found
            if(user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            // var userResponse = new User(user);
            user.token = token;
            // userResponse.token = token;

            return user;
        }

        private string generateJwtToken(User user) {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            Console.WriteLine(_appSettings.Secret);
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new [] { new Claim("id", user.id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

}