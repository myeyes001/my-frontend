import { useState } from "react";

function Catalogue() {

  const products = [
    {
      id: 1,
      name: "Pizza",
      category: "Boissons"
    },

    {
      id: 2,
      name: "Sandwich",
      category: "Fast-food"
    },

    {
      id: 3,
      name: "Café",
      category: "Desserts"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  return (
    <div className="container mt-5">

      <h1>Catalogue</h1>

      <div className="mb-4">

        <button
          className="btn btn-dark mx-2"
          onClick={() => setSelectedCategory("Tous")}
        >
          Tous
        </button>

        <button
          className="btn btn-primary mx-2"
          onClick={() => setSelectedCategory("Boissons")}
        >
          Boissons
        </button>

        <button
          className="btn btn-success mx-2"
          onClick={() => setSelectedCategory("Fast-food")}
        >
          Fast-food
        </button>

        <button
          className="btn btn-warning mx-2"
          onClick={() => setSelectedCategory("Desserts")}
        >
          Desserts
        </button>

      </div>

      <div>

        {filteredProducts.map((product) => (

          <div
           key={product.id}
            className="card p-3 mb-3"
          >

            <h4>{product.name}</h4>

            <p>{product.category}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Catalogue;