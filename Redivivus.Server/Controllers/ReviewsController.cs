using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Redivivus.Server.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Redivivus.Server.Services;
using System.Security.Cryptography;

namespace Redivivus.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReviewsController : ControllerBase
    {
        public Database db = new Database();

        [HttpPost("createReview")]
        public async Task<IActionResult> CreateReview([FromBody] ReviewDto reviewDto)
        {


            var product = await db.Products
    .Include(p => p.Reviews)
    .FirstOrDefaultAsync(p => p.Id == reviewDto.ProductId);
            if (product == null)
            {
                return NotFound("Product not found");
            }

           
            var user = await db.Users.FindAsync(reviewDto.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

           
            var review = new ProductReview
            {
                UserId = reviewDto.UserId,
                ProductId = reviewDto.ProductId,
                ReviewText = reviewDto.ReviewText,
                Rating = reviewDto.Rating,
                Product = product
            };

            
            product.Reviews.Add(review);

            
            await db.SaveChangesAsync();

            return Ok("Review Created!");

        }

        // Optional: Implement a method to get a review by ID (for the CreatedAtAction)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReviewById(int id)
        {
            var review = await db.Products.FindAsync(id);

            return Ok(review);
        }

        public class ReviewDto
        {
            public int UserId { get; set; }
            public int ProductId { get; set; }
            public string ReviewText { get; set; }
            // Rating can be stored as an integer or decimal depending on rating scale
            public int Rating { get; set; }
        }
    }
}
