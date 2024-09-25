import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="flex hidden justify-center gap-x-8">
      <Link to="/" className="mt-4 text-white">
        Inicio
      </Link>
      <Link to="/trivia" className="mt-4 text-white">
        Trivia
      </Link>
      <Link to="/form" className="mt-4 text-white">
        Formulario
      </Link>
      <Link to="/memory" className="mt-4 text-white">
        Memoria
      </Link>
    </div>
  );
}

export default Nav;
