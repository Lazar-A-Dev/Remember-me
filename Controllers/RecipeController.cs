using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : ControllerBase
    {
        public Context _context;

        public RecipeController(Context context)
        {
            _context = context;
        }

        [Route("ReturnAllRecipes")]
        [HttpGet]
        public async Task<ActionResult> ReturnAllRecipes()
        {
            try
            {
                var recipe = await _context.Recipes.Include(r => r.Ingredients).ToListAsync();
                return Ok(recipe);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ReturnLastRecipe")]
        [HttpGet]
        public async Task<ActionResult> ReturnLastRecipe()
        {
            try
            {
                var recipe = await _context.Recipes
                .OrderByDescending(r => r.ID) // Zamenjajte sa odgovarajućim atributom
                .FirstOrDefaultAsync();
                return Ok(recipe);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("AdvancedSearchForRecipes/{idRecType}/{recName}")]
        [HttpGet]
        public async Task<ActionResult> AdvancedSearchForRecipes(int idRecType, string recName)
        {
            try
            {
                // Prikupi sve tipove recepata sa njihovim receptima
                var recipeTypesWithRecipes = await _context.RecipeTypes.Include(r => r.Recipes).ToListAsync();

                if (idRecType == 0)
                {
                    if (recName == "empty")
                    {
                        // Vrati sve recepte
                        var allRecipes = recipeTypesWithRecipes.SelectMany(rt => rt.Recipes).ToList();
                        return Ok(allRecipes);
                    }
                    else
                    {
                        // Vrati recepte sa datim imenom
                        var matchingRecipes = recipeTypesWithRecipes
                            .SelectMany(rt => rt.Recipes)
                            .Where(r => r.Name == recName)
                            .ToList();
                        return Ok(matchingRecipes);
                    }
                }
                else if (idRecType == -1)
                {
                    // Dodajte logiku za -2 ako je potrebno
                }
                else if (idRecType > 0)
                {
                    if (recName != "empty")
                    {
                        // Filtriraj recepte po ID tipa recepta i imenu recepta
                        var filteredRecipes = recipeTypesWithRecipes
                            .Where(rt => rt.ID == idRecType)
                            .SelectMany(rt => rt.Recipes)
                            .Where(r => r.Name == recName)
                            .ToList();
                        return Ok(filteredRecipes);
                    }
                    else
                    {
                        // Vrati sve recepte za određeni tip recepta
                        var specificRecipeType = recipeTypesWithRecipes.FirstOrDefault(rt => rt.ID == idRecType);
                        if (specificRecipeType != null)
                        {
                            return Ok(specificRecipeType.Recipes);
                        }
                        else
                        {
                            return NotFound(); // Tip recepta sa datim ID-jem nije pronađen
                        }
                    }
                }
                else
                {
                    return BadRequest("Nevažeći parametri"); // Neodgovarajući parametri
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            // Dodatna izjava `return` kako bi se pokrile sve moguće putanje
            return BadRequest("Nepredviđena greška"); // ili odgovarajuća vrednost
        }




        [Route("InsertRecepie")]
        [HttpPost]
        public async Task<ActionResult> InsertRecepie(Recipe recipe)
        {
            try
            {
                _context.Recipes.Add(recipe);
                await _context.SaveChangesAsync();
                return Ok("Recepie was successfully inserted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ManuallyInsertRecipe/{name}/{description}/{picture}")]
        [HttpPost]
        public async Task<ActionResult> ManuallyInsertRecipe(string? name, string? description, string? picture)
        {
            try
            {
                var rec = new Recipe
                {
                    Name = name,
                    Description = description,
                    Picture = picture,
                };

                _context.Recipes.Add(rec);
                await _context.SaveChangesAsync();
                return Ok("Recipe was successfully inserted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("AddIngredientToRecipe/{idRec}/{idIng}")]
        [HttpPut]
        public async Task<ActionResult> AddExistingProductToExProType(int idRec, int idIng)
        {
            try
            {
                var recipe = await _context.Recipes.Include(r => r.Ingredients).FirstOrDefaultAsync(r => r.ID == idRec);
                if (recipe == null)
                    return BadRequest("Recipe with this id does not exist");

                var ing = await _context.Ingredients.FindAsync(idIng);
                if (ing == null)
                    return BadRequest("Ingredient with this id does not exist");

                recipe.Ingredients.Add(ing);
                await _context.SaveChangesAsync();
                return Ok("Ingredient was successfully added to recipe");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteRecipe/{idRec}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteRecipe(int idRec)
        {
            try
            {
                var recipe = await _context.Recipes.Include(r => r.Ingredients).FirstOrDefaultAsync(r => r.ID == idRec);

                if (recipe == null)
                {
                    return NotFound(); // Ako ne postoji recept sa datim ID-em
                }

                // Prvo obrišite sve sastojke koji pripadaju ovom receptu
                foreach (var ingredient in recipe.Ingredients)
                {
                    _context.Ingredients.Remove(ingredient);
                }

                // Zatim obrišite sam recept
                _context.Recipes.Remove(recipe);

                await _context.SaveChangesAsync();

                return Ok("Recipe and its associated ingredients were successfully deleted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}