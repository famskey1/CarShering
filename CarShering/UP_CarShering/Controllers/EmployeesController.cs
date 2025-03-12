using UP_CarShering.Data;
using UP_CarShering.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace UP_CarShering.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class EmployeesController : ControllerBase
	{
		ApplicationContext db;
		IConfiguration configuration;
		public EmployeesController(ApplicationContext dbb, IConfiguration conf)
		{
			db = dbb;
			configuration = conf;
		}
		
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Employees>>> Get()
		{
			return await db.employees.ToListAsync();
		}
		[HttpGet("{id}")]
		public async Task<ActionResult<IEnumerable<Employees>>> Get(int id)
		{
			Employees e = await db.employees.FirstOrDefaultAsync(x => x.id_emplo == id);
			if (e == null) return NotFound();
			return new ObjectResult(e);
		}
		
		[HttpPost]
		public async Task<ActionResult<Employees>> Post(Employees employees)
		{
			if (employees == null)
			{
				return BadRequest();
			}
			db.employees.Add(employees);
			await db.SaveChangesAsync();
			return Ok(employees);
		}

		[Route("login")]
		public async Task<ActionResult<Employees>> Login(LoginPass login)
		{
			Employees e = await db.employees.FirstOrDefaultAsync(x => x.password == login.password && x.login == login.login);
			if (e != null)
			{
				var claims = new[]
				{
				new Claim(JwtRegisteredClaimNames.Sub, configuration["JWT:Subject"]),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim("id_emplo", e.id_emplo.ToString()),
				new Claim("position", e.position.ToString())
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

				return Ok(new { Token = tokenValue, Employees = e });
			};
			return Unauthorized();
		}
		
		[HttpPut]
		public async Task<ActionResult<Employees>> Patch(Employees employees)
		{
			if (employees == null)
			{
				return BadRequest();
			}
			if (!db.employees.Any(x => x.id_emplo == employees.id_emplo))
			{
				return NotFound();
			}
			db.employees.Update(employees);
			await db.SaveChangesAsync();
			return Ok(employees);
		}
		
		[HttpDelete("{id}")]
		public async Task<ActionResult<Employees>> Delete(int id)
		{
			Employees e = await db.employees.FirstOrDefaultAsync(x => x.id_emplo == id);
			if (e == null)
			{
				return BadRequest();
			}
			db.employees.Remove(e);
			await db.SaveChangesAsync();
			return Ok(e);
		}
	}
}
