using botaniccoreajaxproject.Models;
using Microsoft.EntityFrameworkCore;

namespace botaniccoreajaxproject.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<BotanicGarden> BotanicGardens { get; set; }
        public DbSet<Plants> Plants { get; set; }

    }
}

