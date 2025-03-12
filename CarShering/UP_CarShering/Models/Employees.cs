using System.ComponentModel.DataAnnotations;

namespace UP_CarShering.Models
{
	public class Employees
	{
		[Key]
		public int id_emplo { get; set; }
		public string name { get; set; }
		public string surname { get; set; }
		public string? secondname { get; set; }
		public string login { get; set; }
		public string password { get; set; }
		public string? position { get; set; }
	}
}
