using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class AchievementController : ControllerBase
    {
        public Context _context;

        public AchievementController(Context context)
        {
            _context = context;
        }

        [Route("ReturnAllAchievements")]
        [HttpGet]
        public async Task<ActionResult> ReturnAllAchievements(){
            try{
                var ach = await _context.Achievements.ToListAsync();
                return Ok(ach);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("ReturnOneAchievements/{idAch}")]
        [HttpGet]
        public async Task<ActionResult> ReturnOneAchievements(int idAch){
            try{
                var ach = await _context.Achievements.FindAsync(idAch);
                return Ok(ach);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("InsertAchievement")]
        [HttpPost]
        public async Task<ActionResult> InsertAchievement(Achievement ach){
            try{
                _context.Achievements.Add(ach);
                await _context.SaveChangesAsync();
                return Ok("Achievement was successfully inserted");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}