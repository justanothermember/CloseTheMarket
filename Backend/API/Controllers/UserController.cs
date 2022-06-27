using BusinessLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Model;

namespace API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private IUsers users;

        public UserController(IUsers users)
        {
            this.users = users;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Post([FromBody] AccountUser user)
        {
            try
            {
                return Created("Successfully added", users.Create(user));
            }
            catch (Exception e)
            {
                return StatusCode(422, e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(users.Get(id));
            }
            catch (Exception e)
            {
                return StatusCode(422, e.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string username, string password)
        {
            try
            {
                return Ok(users.Delete(username, password));
            }
            catch (Exception e)
            {
                return StatusCode(422, e.Message);
            }
        }
    }
}