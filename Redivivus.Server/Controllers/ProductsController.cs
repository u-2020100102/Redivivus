using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Redivivus.Server.Models;
using static Redivivus.Server.Controllers.UsersController;

namespace Redivivus.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController: ControllerBase
    {
        public Database db = new Database();

        [HttpGet("getAllProducts")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await db.Products.ToListAsync();
        }



        [HttpPost("createProduct")]


        public async Task<IActionResult> CreateProduct([FromBody] CreatePayload newProduct)
        {
            var user = db.Users.FirstOrDefault(u => u.Id == newProduct.UserId);

            var product = new Product
            {
                Name = newProduct.Name,
                Description = newProduct.Description,
                Price = newProduct.Price,
                InventoryCount = newProduct.InventoryCount,
                ImageUrl = newProduct.ImageUrl,
            };

            db.Products.Add(product);
            db.SaveChanges();

            return Ok("Product Created!");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await db.Products.FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }


        public class CreatePayload {
            public string Name { get; set; }
            public string Description { get; set; }
            public decimal Price { get; set; }
            public int InventoryCount { get; set; }
            public string ImageUrl { get; set; }

            public int UserId { get; set; }
        }
    }
}
