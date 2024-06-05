namespace Redivivus.Server.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }


        public virtual ICollection<Product> Products { get; set; }

        public virtual ICollection<ShoppingCart> ShoppingCarts { get; set; }

    }
}
