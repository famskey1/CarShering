using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using UP_CarShering.Models;

namespace UP_CarShering.Data
{
	public class ApplicationContext: DbContext
    {
		public DbSet<Employees> employees { get; set; }
		public DbSet<Drivers> drivers { get; set; }
		public DbSet<Transport> transport { get; set; }
		public DbSet<Bill> bill { get; set; }
		public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
		{

		}
	}
}
