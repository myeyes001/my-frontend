import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Buvette Universitaire
        </Link>

        <div>
          <Link className="btn btn-light mx-2" to="/">
            Home
          </Link>

          <Link className="btn btn-light mx-2" to="/catalogue">
            Catalogue
          </Link>

          <Link className="btn btn-light mx-2" to="/login">
            Login
          </Link>
          <Link className="btn btn-light mx-2" to="/register">
            Register
          </Link>

          <Link className="btn btn-light mx-2" to="/cart">
            Cart
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;