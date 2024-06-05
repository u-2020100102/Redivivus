import React, { useState, useEffect } from "react";
import ProductCard from "../../productCard/ProductCard";
const LayoutMain = () => {
  const [allProducts, setAllProducts] = useState([]);

  async function getAllProducts() {
    await fetch("https://localhost:7082/Products/getAllProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
      setAllProducts(data);
    });
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(allProducts);

  return (
    <div className="min-w-full min-h-full p-4 flex flex-row flex-wrap  gap-4 justify-start items-center bg-slate-50">
      {allProducts.length > 0 &&
        allProducts.map((product) => {
          return <ProductCard product={product} />;
        })}
    </div>
  );
};

export default LayoutMain;
