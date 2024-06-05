namespace Redivivus.Server.Models
{
    public class ProductReview
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string ReviewText { get; set; }
        // Rating can be stored as an integer or decimal depending on rating scale
        public int Rating { get; set; }

        public virtual Product Product { get; set; }
    }
}
