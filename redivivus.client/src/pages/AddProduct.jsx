import { useNavigate } from "react-router-dom";
import LayoutHeader from "../component/layout/layoutHeader";
import useAuthToken from "../hooks/useAuthToken";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const [count, setCount] = useState();
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    await fetch("https://localhost:7082/Products/createProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: data.get("Name"),
        Description: data.get("Description"),
        Price: data.get("Price"),
        InventoryCount: data.get("InventoryCount"),
        ImageUrl: data.get("ImageUrl"),
        UserId: localStorage.getItem("userId"),
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        navigate("/");
      }
    });
  }
  return (
    <div>
      <LayoutHeader />
      <div className="flex justify-center content-center flex-wrap min-h-screen">
        <form
          className="flex flex-col gap-4 w-1/2 h-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div class="card lg:card-side bg-base-100 shadow-xl p-4 w-full h-full">
            <input
              type="text"
              id="Name"
              name="Name"
              placeholder="Product Name"
              class="input input-bordered w-full h-s"
            />
          </div>
          <div class="card lg:card-side bg-base-100 shadow-xl p-4 h-full">
            <input
              type="text"
              id="Description"
              name="Description"
              placeholder="Product Description"
              class="textarea textarea-bordered textarea-md w-full"
            />
          </div>
          <div class="card lg:card-side bg-base-100 shadow-xl p-4">
            <input
              type="text"
              id="Price"
              name="Price"
              placeholder="Product Price"
              class="input input-bordered w-full"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            class="card lg:card-side bg-base-100 shadow-xl p-4"
          >
            <div>
              <span class="label-text">Inventory Count</span>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="range"
                min={0}
                max="1000"
                defaultValue="40"
                className="range range-primary"
                id="InventoryCount"
                name="InventoryCount"
                onChange={(e) => {
                  setCount(e.target.value);
                }}
              />
              {count}
            </div>
          </div>
          <div class="card lg:card-side bg-base-100 shadow-xl p-4">
            <input
              type="text"
              id="ImageUrl"
              name="ImageUrl"
              placeholder="Image Url"
              class="input input-bordered w-full"
            />
          </div>
          <input className="btn btn-primary" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
