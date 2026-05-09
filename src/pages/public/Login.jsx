import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
    console.log(password);
  };

  return (
    <div className="container mt-5">

      <h1>Connexion</h1>

      <form onSubmit={handleSubmit}>

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

        <button className="btn btn-primary">
          Se connecter
        </button>

      </form>

    </div>
  );
}

export default Login;