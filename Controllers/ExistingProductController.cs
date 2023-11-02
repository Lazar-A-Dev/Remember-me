using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class ExistingProductController : ControllerBase
    {
        public Context _context;

        public ExistingProductController(Context context)
        {
            _context = context;
        }

        [Route("ReturnExistingProduct/{idProd}")]
        [HttpGet]
        public async Task<ActionResult> ReturnAllExistingProducts(int idProd){
            try{
                var pro = await _context.ExistingProducts.FindAsync(idProd);
                return Ok(pro);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("ReturnAllExistingProducts")]
        [HttpGet]
        public async Task<ActionResult> ReturnAllExistingProducts(){
            try{
                var pro = await _context.ExistingProducts.ToListAsync();
                return Ok(pro);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("InsertExistingProduct")]
        [HttpPost]
        public async Task<ActionResult> InsertExistingProduct(ExistingProduct pro){
            try{
                _context.ExistingProducts.Add(pro);
                await _context.SaveChangesAsync();
                return Ok("Exsisting product was successfully inserted");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }


        [Route("DeleteExistingProduct/{idPro}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteExistingProduct(int idPro){
            try{
                var pro = await _context.ExistingProducts.FindAsync(idPro);
                _context.ExistingProducts.Remove(pro);
                await _context.SaveChangesAsync();
                return Ok("Exsisting product was successfully deleted");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}