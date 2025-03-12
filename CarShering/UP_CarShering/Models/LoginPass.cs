using System.ComponentModel.DataAnnotations;

namespace UP_CarShering.Models
{
	public class LoginPass
	{
		[Required]
		public string login { get; set; }
		[Required]
		public string password { get; set; }
	}
}
