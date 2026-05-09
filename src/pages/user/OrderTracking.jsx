function OrderTracking() {

  const status = "Confirmé";

  return (
    <div className="container mt-5">

      <h1>Suivi de commande</h1>

      <div className="card p-4 mt-4">

        <h4>Statut actuel :</h4>

        <h2 className="text-primary">
          {status}
        </h2>

        <div className="mt-4">

          <p>✅ En attente</p>

          <p>✅ Confirmé</p>
          <p>⏳ Prêt</p>

          <p>⬜ Terminé</p>

        </div>

      </div>

    </div>
  );
}

export default OrderTracking;