import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutHeader from "../component/layout/layoutHeader";

const ProductPage = () => {
  const params = useParams();
  const productId = params.productId;
  const [product, setProduct] = useState();
  const [users, setUsers] = useState([]);

  async function fetchProduct() {
    await fetch(`https://localhost:7082/Products/${productId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((r) => setProduct(r));
  }

  async function getUserName(id) {
    const str = id + "";
    await fetch(`https://localhost:7082/Users/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((r) => {
        setUsers(...users, { [str]: r.userName });
      });
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      product.reviews.map((r) => {
        getUserName(r.userId);
      });
    }
  }, [product]);

  async function createReview(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    await fetch("https://localhost:7082/Reviews/createReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        productId: product.id,
        reviewText: data.get("ReviewText"),
        rating: data.get("Rating"),
      }),
    });
  }

  console.log("product", product);
  console.log("users", users);
  return (
    <div>
      <LayoutHeader />
      {product && (
        <div className="flex flex-col justify-center content-center">
          <div className="flex flex-row justify-center content-center gap-40 mt-10">
            <div>
              <div class="card lg:card-side bg-base-100 shadow-xl p-4 w-full h-full max-w-sm max-h-sm">
                <img src={product.imageUrl} className="max-h-sm" />
              </div>
            </div>
            <div className="flex flex-col gap-4 min-w-xl">
              <div class="card lg:card-side bg-base-100 shadow-xl p-4 w-full h-full max-w-xl max-h-xl">
                <div className="flex flex-col gap-2">
                  <span className="label font-bold">Product Name:</span>
                  <span className="label">{product.name}</span>
                </div>
              </div>
              <div class="card lg:card-side bg-base-100 shadow-xl p-4 w-full h-full max-w-xl max-h-xl">
                <div className="flex flex-col gap-2">
                  <span className="label font-bold">Product Description:</span>
                  <span className="label">{product.description}</span>
                </div>
              </div>
              <div class="card lg:card-side bg-base-100 shadow-xl p-4 w-full h-full max-w-xl max-h-xl">
                <div className="flex flex-col gap-2">
                  <span className="label font-bold">Inventory Count:</span>
                  <span className="label">{product.inventoryCount}</span>
                </div>
              </div>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <form
              className="flex justify-center content-center p-10 w-2/3"
              onSubmit={(e) => {
                createReview(e);
              }}
            >
              <div class="card lg:card-side bg-base-100 shadow-xl p-4 w-full h-full max-w-xl max-h-xl">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-row justify-between">
                    <span className="label font-bold">Your Review:</span>
                    <div class="rating">
                      <input
                        type="radio"
                        name="Rating"
                        value={1}
                        class="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="Rating"
                        value={2}
                        class="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="Rating"
                        value={3}
                        class="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="Rating"
                        value={4}
                        class="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="Rating"
                        value={5}
                        class="mask mask-star-2 bg-orange-400"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    name={"ReviewText"}
                    className="input input-bordered input-success w-full max-w-full"
                  />
                  <input type="submit" className="btn btn-neutral" />
                </div>
              </div>
            </form>
            <div className="flex flex-col gap-3 justify-center content-center p-10 w-2/3">
              {product.reviews &&
                users &&
                product.reviews.map((r) => {
                  return (
                    <div className="card lg:card-side bg-base-100 shadow-xl p-4 w-full h-full max-w-xl max-h-xl">
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-row justify-between">
                          <div className="font-bold">{users[r.userId]}</div>
                          <div></div>
                        </div>
                        <div>{r.reviewText}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
