using System.ComponentModel.DataAnnotations;

namespace UP_CarShering.Models
{
	public class Transport
	{
		[Key]
		public int id_tran { get; set; }
		public string type_tran { get; set; }
		public string mark { get; set; }
		public string model { get; set; }
		public double cost { get; set; }
		public string status { get; set; }
	}
}
