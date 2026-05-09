function ProductDetail() {
  return (
    <div className="container mt-5">

      <h1>Détails du produit</h1>

      <div className="card p-4 mt-4">

        <h3>Pizza</h3>

        <p>Prix : 25 DH</p>

        <p>Délicieuse pizza préparée à la buvette universitaire</p>

        <button className="btn btn-primary">
          Ajouter au panier
        </button>

      </div>

    </div>
  );
}
export default ProductDetail;