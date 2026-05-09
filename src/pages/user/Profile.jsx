function Profile() {
  return (
    <div className="container mt-5">

      <h1>Profil utilisateur</h1>

      <form>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nom"
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
        />

        <button className="btn btn-primary">
          Modifier
        </button>

      </form>
      </div>
  );
}

export default Profile;
