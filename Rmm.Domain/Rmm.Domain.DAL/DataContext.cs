using Microsoft.EntityFrameworkCore;
using Rmm.Domain.DAL.Entities;

namespace Rmm.Domain.DAL
{
    public class DataContext : DbContext
    {
        public DbSet<DeviceInfo> Devices { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Session> Sessions { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
    }
}
