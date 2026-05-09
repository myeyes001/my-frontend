import { useState } from "react";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(name);
    console.log(email);
    console.log(password);
  };

  return (
    <div className="container mt-5">

      <h1>Inscription</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nom"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success">
          S'inscrire
        </button>

      </form>

    </div>
  );
}

export default Register;