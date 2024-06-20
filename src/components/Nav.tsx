import { Link } from "react-router-dom";

function Nav() {
    return (
        <div className="flex justify-center gap-x-8 hidden">
            <Link to="/" className="text-white mt-4">Inicio</Link>
            <Link to="/trivia" className="text-white mt-4">Trivia</Link>
            <Link to="/form" className="text-white mt-4">Formulario</Link>
            <Link to="/memory" className="text-white mt-4">Memoria</Link>
        </div>
    )
}

export default Nav;