using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UP_CarShering.Data;
using UP_CarShering.Models;

namespace UP_CarShering.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class TransportController : ControllerBase
	{
		ApplicationContext db;

		public TransportController(ApplicationContext dbb)
		{
			db = dbb;
		}
		
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Transport>>> Get()
		{
			return await db.transport.ToListAsync();
		}
		
		[HttpGet("{id}")]
		public async Task<ActionResult<IEnumerable<Transport>>> Get(int id)
		{
			Transport t = await db.transport.FirstOrDefaultAsync(x => x.id_tran == id);
			if (t == null) return NotFound();
			return new ObjectResult(t);
		}

		[HttpPost]
		public async Task<ActionResult<Transport>> Post(Transport transport)
		{
			if (transport == null)
			{
				return BadRequest();
			}
			db.transport.Add(transport);
			await db.SaveChangesAsync();
			return Ok(transport);
		}
		
		[HttpPut]
		public async Task<ActionResult<Transport>> Patch(Transport transport)
		{
			if (transport == null)
			{
				return BadRequest();
			}
			if (!db.transport.Any(x => x.id_tran == transport.id_tran))
			{
				return NotFound();
			}
			db.transport.Update(transport);
			await db.SaveChangesAsync();
			return Ok(transport);
		}
		
		[HttpDelete("{id}")]
		public async Task<ActionResult<Transport>> Delete(int id)
		{
			Transport t = await db.transport.FirstOrDefaultAsync(x => x.id_tran == id);
			if (t == null)
			{
				return BadRequest();
			}
			db.transport.Remove(t);
			await db.SaveChangesAsync();
			return Ok(t);
		}
	}
}
