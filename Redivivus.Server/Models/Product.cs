namespace Redivivus.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int InventoryCount { get; set; }
        public string ImageUrl { get; set; }

        public int UserId { get; set; }

        public virtual ICollection<ProductReview> Reviews { get; set; }
    }
}
