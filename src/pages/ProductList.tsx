import React from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-20 text-red-500">
        Error loading products
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product: any) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="block border rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-gray-500 mt-1">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
