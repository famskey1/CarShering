using System.ComponentModel.DataAnnotations;

namespace UP_CarShering.Models
{
	public class Drivers
	{
		[Key]
		public int id_driver { get; set; } 
		public string name { get; set; }
		public string surname { get; set; }
		public string? secondname { get; set; }
		public string login { get; set; }
		public string password { get; set; }
		public string num_bank_card { get; set; }
		public int cvc { get; set; }
	}
}
