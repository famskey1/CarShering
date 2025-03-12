using UP_CarShering.Data;
using UP_CarShering.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace UP_CarShering.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class DriversController : ControllerBase
	{
		ApplicationContext db;
		IConfiguration configuration;

		public DriversController(ApplicationContext dbb, IConfiguration conf)
		{
			db = dbb;
			configuration = conf;
		}
		
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Drivers>>> Get()
		{
			return await db.drivers.ToListAsync();
		}
		
		[HttpGet("{id}")]
		public async Task<ActionResult<IEnumerable<Drivers>>> Get(int id)
		{
			Drivers d = await db.drivers.FirstOrDefaultAsync(x => x.id_driver == id);
			if (d == null) return NotFound();
			return new ObjectResult(d);
		}
		
		[HttpPost]
		public async Task<ActionResult<Drivers>> Post(Drivers drivers)
		{
			if (drivers == null)
			{
				return BadRequest();
			}
			db.drivers.Add(drivers);
			await db.SaveChangesAsync();
			return Ok(drivers);
		}
		
		[Route("login")]
		public async Task<ActionResult<Drivers>> Login(LoginPass login)
		{
			Drivers d = await db.drivers.FirstOrDefaultAsync(x => x.password == login.password && x.login == login.login);
			if (d != null) {
				var claims = new[]
				{
				new Claim(JwtRegisteredClaimNames.Sub, configuration["JWT:Subject"]),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim("id_driver", d.id_driver.ToString()),
				new Claim("num_bank_card", d.num_bank_card.ToString())
			};
				var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"]));
				var signIN = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
				var token = new JwtSecurityToken(
					configuration["JWT:Issuer"],
					configuration["JWT:Audience"],
					claims,
					expires: DateTime.UtcNow.AddMinutes(60),
					signingCredentials: signIN
					);
				string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

				return Ok(new { Token = tokenValue, Driver = d});
			};
			return Unauthorized();
		}

		[HttpPut]
		public async Task<ActionResult<Drivers>> Patch(Drivers drivers)
		{
			if (drivers == null)
			{
				return BadRequest();
			}
			if (!db.drivers.Any(x => x.id_driver == drivers.id_driver))
			{
				return NotFound();
			}
			db.drivers.Update(drivers);
			await db.SaveChangesAsync();
			return Ok(drivers);
		}
		
		[HttpDelete("{id}")]
		public async Task<ActionResult<Drivers>> Delete(int id)
		{
			Drivers d = await db.drivers.FirstOrDefaultAsync(x => x.id_driver == id);
			if (d == null)
			{
				return BadRequest();
			}
			db.drivers.Remove(d);
			await db.SaveChangesAsync();
			return Ok(d);
		}
	}
}
