using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class UserFeedbackController : ControllerBase
    {
        public Context _context;

        public UserFeedbackController(Context context)
        {
            _context = context;
        }

        [Route("ReturnAllUserFeedbacks")]
        [HttpGet]
        public async Task<ActionResult> ReturnAllUserFeedbacks(){
            try{
                var fb = await _context.UserFeedbacks.ToListAsync();
                return Ok(fb);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("InsertUserFeedback")]
        [HttpPost]
        public async Task<ActionResult> InsertUserFeedback(UserFeedback fb){
            try{
                _context.UserFeedbacks.Add(fb);
                await _context.SaveChangesAsync();
                return Ok("User feedback was successfully inserted");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("ManuallyInsertUserFeedback/{type}/{description}")]
        [HttpPost]
        public async Task<ActionResult> ManuallyInsertUserFeedback(string type, string description)
        {
            try
            {
                var feedback = new UserFeedback{
                    Type = type,
                    Description = description
                };

                _context.UserFeedbacks.Add(feedback);
                await _context.SaveChangesAsync();
                return Ok("User feedback was successfully inserted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}