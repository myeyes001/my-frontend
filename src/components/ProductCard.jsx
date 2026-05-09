function ProductCard({ product }) {
  return (
    <div className="card p-3 m-2">

      <h4>{product.name}</h4>

      <p>Prix : {product.price} DH</p>

      <button className="btn btn-primary">
        Ajouter au panier
      </button>

    </div>
  );
}

export default ProductCard;