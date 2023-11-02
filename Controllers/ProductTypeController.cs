using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class ProductTypeController : ControllerBase
    {
        public Context _context;

        public ProductTypeController(Context context)
        {
            _context = context;
        }

        [Route("ReturnAllProductTypes")]
        [HttpGet]
        public async Task<ActionResult> ReturnAllProductTypes()
        {
            try
            {
                var proT = await _context.ProductTypes.Include(e => e.ExistingProducts).ToListAsync();
                return Ok(proT);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ReturnAllProductsOfOneType/{idProType}")]
        [HttpGet]
        public async Task<ActionResult> ReturnAllProductsOfOneType(int idProType)
        {
            try
            {
                var proT = await _context.ProductTypes
                    .Include(e => e.ExistingProducts)
                    .FirstOrDefaultAsync(p => p.ID == idProType);

                if (proT != null)
                {
                    var sortedProducts = proT.ExistingProducts.ToList(); // Ovde sortirajte proizvode po imenima

                    return Ok(sortedProducts);
                }
                else
                {
                    return BadRequest("Product type with this id does not exist"); // Type not found
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        [Route("InsertProductType")]
        [HttpPost]
        public async Task<ActionResult> InsertProductType(ProductType proT)
        {
            try
            {
                _context.ProductTypes.Add(proT);
                await _context.SaveChangesAsync();
                return Ok("Product type was successfully inserted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("AddExistingProductToProductType/{idExProT}/{idPro}")]
        [HttpPut]
        public async Task<ActionResult> AddExistingProductToProductType(int idExProT, int idPro)
        {
            try
            {
                var proT = await _context.ProductTypes.Include(p => p.ExistingProducts).FirstOrDefaultAsync(p => p.ID == idExProT);
                if (proT == null)
                    return BadRequest("Product type with this id does not exist");

                var pro = await _context.ExistingProducts.FindAsync(idPro);
                if (pro == null)
                    return BadRequest("Existing product with this id does not exist");

                proT.ExistingProducts.Add(pro);
                await _context.SaveChangesAsync();
                return Ok("Existing product was successfully added to product type");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteProductType/{idProT}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteExistingProductType(int idProT)
        {
            try
            {
                var proT = await _context.ProductTypes.FindAsync(idProT);
                _context.ProductTypes.Remove(proT);
                await _context.SaveChangesAsync();
                return Ok("Product type was successfully deleted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}