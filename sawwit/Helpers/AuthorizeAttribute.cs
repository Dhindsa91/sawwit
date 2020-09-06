using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using sawwit.Models;
namespace sawwit.Helpers {
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter {

        public void OnAuthorization(AuthorizationFilterContext context) {
            var user =(User) context.HttpContext.Items["User"];
            Console.WriteLine("Auth {0}", user.id);
            if(user == null) {
                // not logged in
                context.Result = new JsonResult(new { message = "Unauthorized", error = true, ok = false }) { StatusCode = StatusCodes.Status401Unauthorized };

            }
            Console.WriteLine("123");
        }

    }
}