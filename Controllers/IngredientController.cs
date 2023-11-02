using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class IngredientController : ControllerBase
    {
        public Context _context;

        public IngredientController(Context context)
        {
            _context = context;
        }

        [Route("ReturnAllIngredients")]
        [HttpGet]
        public async Task<ActionResult> ReturnAllIngredients(){
            try{
                var ing = await _context.Ingredients.ToListAsync();
                return Ok(ing);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("ReturnLastIngredient")]
        [HttpGet]
        public async Task<ActionResult> ReturnLastIngredient()
        {
            try
            {
                var ing = await _context.Ingredients
                .OrderByDescending(r => r.ID)
                .FirstOrDefaultAsync();
                if(ing == null)
                return BadRequest("There are no ingredients");
                return Ok(ing);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("InsertIngredient")]
        [HttpPost]
        public async Task<ActionResult> InsertIngredient(Ingredient ing){
            try{
                _context.Ingredients.Add(ing);
                await _context.SaveChangesAsync();
                return Ok("Ingredient was successfully inserted");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("ManuallyInsertIngredient/{type}/{description}/{quantity}/{weight}")]
        [HttpPost]
        public async Task<ActionResult> ManuallyInsertIngredient(int? type, string? description, int? quantity, int? weight)
        {
            try
            {

                var ing = new Ingredient
                {
                    Type = type,
                    Description = description,
                    Quantity = quantity,
                    Weight = weight
                };

                _context.Ingredients.Add(ing);
                await _context.SaveChangesAsync();
                return Ok("Ingredient was successfully inserted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("AddBoughtProToIngredient/{idSas}/{idPost}")]
        [HttpPut]
        public async Task<ActionResult> AddBoughtProToIngredient(int idIng, int idProd){
            try{
                var sastojak = await _context.Ingredients.FindAsync(idIng);
                if(sastojak == null)
                return BadRequest("Ingredient with this id does not exist");

                var post = await _context.ExistingProducts.FindAsync(idProd);
                if(post == null)
                return BadRequest("Exsisting product with this id does not exist");

                sastojak.Type = post.ID;
                await _context.SaveChangesAsync();
                return Ok("Existing product was successfully added to ingredient");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteIngredient/{idIng}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteIngredient(int idIng)
        {
            try
            {
                var ing = await _context.Ingredients.FindAsync(idIng);
                if(ing == null)
                return BadRequest("Ingredient with this id does not exist");

                _context.Ingredients.Remove(ing);
                await _context.SaveChangesAsync();
                return Ok("Ingredient was successfully deleted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}