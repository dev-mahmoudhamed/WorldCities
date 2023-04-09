﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using WorldCitiesAPI.Data;
using WorldCitiesAPI.Models;
using WorldCitiesAPI.Controllers;
using Microsoft.Extensions.Configuration;

namespace WorldCitiesAPI.Tests
{
    public class SeedController_Tests
    {
        [Fact]
        public async Task CreateDefaultUsers()
        {
            // (*******************   Arrange    ********************)
            // create the option instances required by the ApplicationDbContext
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "WorldCities").Options;
            var mockEnv = Mock.Of<IWebHostEnvironment>();

            // create a IConfiguration mock instance
            var mockConfiguration = new Mock<IConfiguration>();
            mockConfiguration.SetupGet(x => x[It.Is<string>(s => s == "DefaultPasswords:RegisteredUser")]).Returns("M0ckP$$word");
            mockConfiguration.SetupGet(x => x[It.Is<string>(s => s == "DefaultPasswords:Administrator")]).Returns("M0ckP$$word");

            // create a ApplicationDbContext instance using the in-memory DB
            using var context = new ApplicationDbContext(options);

            // create a RoleManager instance
            var roleManager = IdentityHelper.GetRoleManager(new RoleStore<IdentityRole>(context));

            // create a UserManager instance
            var userManager = IdentityHelper.GetUserManager(new UserStore<ApplicationUser>(context));

            // create a SeedController instance
            var controller = new SeedController(context, mockEnv, roleManager, userManager, mockConfiguration.Object);

            // define the variables for the users we want to test
            ApplicationUser user_Admin = null!;
            ApplicationUser user_User = null!;
            ApplicationUser user_NotExisting = null!;



            // (*******************   Act    ********************)
            // execute the SeedController's CreateDefaultUsers() method to create the default users (and roles)
            await controller.CreateDefaultUsers();

            // retrieve the users
            user_Admin = await userManager.FindByEmailAsync("admin@email.com");
            user_User = await userManager.FindByEmailAsync("user@email.com");
            user_NotExisting = await userManager.FindByEmailAsync("notexisting@email.com");



            //(*******************   Assert    ********************)
            Assert.NotNull(user_Admin);
            Assert.NotNull(user_User);
            Assert.Null(user_NotExisting);
        }
    }
}
