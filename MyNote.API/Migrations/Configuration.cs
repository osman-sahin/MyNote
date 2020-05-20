namespace MyNote.API.Migrations
{
    using Microsoft.Ajax.Utilities;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using MyNote.API.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MyNote.API.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(MyNote.API.Models.ApplicationDbContext context)
        {
            var userName = "osmansahin.eng@gmail.com";
            if (!context.Users.Any(u => u.UserName == userName))
            {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = userName, Email = userName, EmailConfirmed = true };

                manager.Create(user, "Password2!");

                for (int i = 0; i <= 5; i++)
                    context.Notes.Add(new Note
                    {
                        AuthorId = user.Id,
                        Title = "Sample Title 1",
                        Content = "Sample Lorem Ipsum elit in malaesı semper piss, id sollicitudin urna fermentum.",
                        CreationTime = DateTime.Now,
                        ModificationTime = DateTime.Now
                    });
            }
        }
    }
}
