function Checkout() {
  return (
    <div className="container mt-5">

      <h1>Validation de commande</h1>

      <form>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Créneau de retrait"
        />

        <textarea
          className="form-control mb-3"
          placeholder="Notes"
        ></textarea>
        <button className="btn btn-primary">
          Confirmer la commande
        </button>

      </form>

    </div>
  );
}
export default Checkout;
