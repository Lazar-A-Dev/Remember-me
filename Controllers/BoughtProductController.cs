using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class BoughtProductController : ControllerBase
    {
        public Context _context;

        public BoughtProductController(Context context)
        {
            _context = context;
        }

        [Route("ReturnAllBoughtProducts")]
        [HttpGet]
        public async Task<ActionResult> ReturnAllBoughtProducts()
        {
            try
            {
                var pro = await _context.BoughtProducts.ToListAsync();
                return Ok(pro);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("AdvancedSearchForBoughtProducts/{idProdType}/{prodName}")]
        [HttpGet]
        public async Task<ActionResult> AdvancedSearchForBoughtProducts(int idProdType, string prodName)
        {
            try
            {
                var query = _context.BoughtProducts.AsQueryable(); // Početni upit za sve kupljene proizvode.

                if (idProdType != 0)
                {
                    query = query.Where(p => p.Type == idProdType);
                }

                if (!string.IsNullOrEmpty(prodName) && prodName != "empty")
                {
                    query = query.Where(p => p.Name == prodName);
                }

                var results = await query.ToListAsync();

                return Ok(results);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("InsertBoughtProduct")]
        [HttpPost]
        public async Task<ActionResult> InsertBoughtProduct(BoughtProduct pro)
        {
            try
            {
                _context.BoughtProducts.Add(pro);
                await _context.SaveChangesAsync();
                return Ok("Bought product was successfully inserted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ManuallyInsertBoughtProduct/{type}/{name}/{description}/{picture}/{quantity}/{weight}/{purchaseDate}/{expirationDate}")]
        [HttpPost]
        public async Task<ActionResult> ManuallyInsertBoughtProduct(int? type, string? name, string? description, string? picture, int? quantity, int? weight, DateTime purchaseDate, DateTime expirationDate)
        {
            try
            {
                var pro = new BoughtProduct
                {
                    Type = type,
                    Name = name,
                    Description = description,
                    Picture = picture,
                    Quantity = quantity,
                    Weight = weight,
                    PurchaseDate = purchaseDate,
                    ExpirationDate = expirationDate
                };

                _context.BoughtProducts.Add(pro);
                await _context.SaveChangesAsync();
                return Ok("Bought product was successfully inserted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ManuallyEditBoughtProduct/{idProd}/{type}/{name}/{description}/{picture}/{quantity}/{weight}/{purchaseDate}/{expirationDate}")]
        [HttpPut]
        public async Task<ActionResult> ManuallyEditBoughtProduct(int idProd, int? type, string? name, string? description, string? picture, int? quantity, int? weight, DateTime purchaseDate, DateTime expirationDate)
        {
            try
            {
                var prod = await _context.BoughtProducts.FindAsync(idProd);
                if(prod == null)
                return BadRequest("Bought product with this id does not exist");

                prod.Type = type;
                prod.Name = name;
                prod.Description = description;
                prod.Picture = picture;
                prod.Quantity = quantity;
                prod.Weight = weight;
                prod.PurchaseDate = purchaseDate;
                prod.ExpirationDate = expirationDate;

                await _context.SaveChangesAsync();
                return Ok("Bought product was successfully edited");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("DeleteBoughtProduct/{idPro}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteBoughtProduct(int idPro)
        {
            try
            {
                var pro = await _context.BoughtProducts.FindAsync(idPro);
                _context.BoughtProducts.Remove(pro);
                await _context.SaveChangesAsync();
                return Ok("Bought product was successfully deleted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}