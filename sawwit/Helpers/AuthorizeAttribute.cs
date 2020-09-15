using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using sawwit.Models;
namespace sawwit.Helpers {
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter {

        public void OnAuthorization(AuthorizationFilterContext context) {
            Console.WriteLine("We Are Here");
            var user = context.HttpContext.Items["User"];

            if(user == null) {
                // not logged in
                Console.WriteLine("User equal null");
                context.Result = new JsonResult(new { message = "Unauthorized", error = true, ok = false }) { StatusCode = StatusCodes.Status401Unauthorized };

            }

        }

    }
}