using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UP_CarShering.Data;
using UP_CarShering.Models;

namespace UP_CarShering.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class BillController : ControllerBase
	{
		ApplicationContext db;
		public BillController(ApplicationContext dbb)
		{
			db = dbb;
		}
		
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Bill>>> Get()
		{
			return await db.bill.ToListAsync();
		}
		
		[HttpGet("{id}")]
		public async Task<ActionResult<IEnumerable<Bill>>> Get(int id)
		{
			Bill b = await db.bill.FirstOrDefaultAsync(x => x.id_bill == id);
			if (b == null) return NotFound();
			return new ObjectResult(b);
		}
		
		[HttpPost]
		public async Task<ActionResult<Bill>> Post(Bill bill)
		{
			if (bill == null)
			{
				return BadRequest();
			}
			db.bill.Add(bill);
			await db.SaveChangesAsync();
			return Ok(bill);
		}
		
		[HttpPatch]
		public async Task<ActionResult<Bill>> Patch(Bill bill)
		{
			if (bill == null)
			{
				return BadRequest();
			}
			if (!db.bill.Any(x => x.id_bill == bill.id_bill))
			{
				return NotFound();
			}
			db.bill.Update(bill);
			await db.SaveChangesAsync();
			return Ok(bill);
		}
		
		[HttpDelete("{id}")]
		public async Task<ActionResult<Transport>> Delete(int id)
		{
			Bill b = await db.bill.FirstOrDefaultAsync(x => x.id_bill == id);
			if (b == null)
			{
				return BadRequest();
			}
			db.bill.Remove(b);
			await db.SaveChangesAsync();
			return Ok(b);
		}
	}
}
