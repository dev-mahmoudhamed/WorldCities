using Microsoft.EntityFrameworkCore;
using WorldCitiesAPI.Models;

namespace WorldCitiesAPI.Data
{
    public class WorldCitiesDbContext : DbContext
    {
        public WorldCitiesDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<City> Cities => Set<City>();
        public DbSet<Country> Countries => Set<Country>();
    }
}
