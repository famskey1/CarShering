using System.ComponentModel.DataAnnotations;
using System.Data;

namespace UP_CarShering.Models
{
	public class Bill
	{
		[Key]
		public int id_bill { get; set; }
		public int? id_emplo { get; set; }
		public int id_driver { get; set; }
		public int id_tran { get; set; }
		public DateTime data_time_start { get; set; }
		public DateTime data_time_end { get; set; }
		public double? cost_end { get; set; }
	}
}
