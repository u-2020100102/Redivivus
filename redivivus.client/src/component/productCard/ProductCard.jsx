import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  console.log(product);
  return (
    <div
      class="card w-96 bg-base-100 shadow-xl max-h-96"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <figure>
        <img src={product.imageUrl} />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div class="card-actions justify-end">
          <div class="badge badge-secondary">{product.price}$</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
