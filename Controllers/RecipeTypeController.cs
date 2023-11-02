using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeTypeController : ControllerBase
    {
        public Context _context;

        public RecipeTypeController(Context context)
        {
            _context = context;
        }

        [Route("ReturnAllRecipeTypes")]
        [HttpGet]
        public async Task<ActionResult> ReturnAllRecipeTypes(){
            try{
                var types = await _context.RecipeTypes.Include(r => r.Recipes).ToListAsync();
                return Ok(types);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("InsertRecipeType")]
        [HttpPost]
        public async Task<ActionResult> InsertRecipeType(RecipeType type){
            try{
                _context.RecipeTypes.Add(type);
                await _context.SaveChangesAsync();
                return Ok("Recipe type was successfully inserted");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("AddRecipeToRecipeType/{idRecType}/{idRec}")]
        [HttpPut]
        public async Task<ActionResult> AddRecipeToRecipeType(int idRecType, int idRec){
            try{
                var type = await _context.RecipeTypes.Include(r => r.Recipes).FirstOrDefaultAsync(r => r.ID == idRecType);
                if(type == null)
                return BadRequest("Recipe type with this id does not exist");

                var rec = await _context.Recipes.FindAsync(idRec);
                if(rec == null)
                return BadRequest("Recipe with this id does not exist");

                type.Recipes.Add(rec);
                await _context.SaveChangesAsync();
                return Ok("Recipe was successfully added to recipe type");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }


    }
}