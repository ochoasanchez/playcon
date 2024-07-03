import { Link } from "react-router-dom";
import logo from "../assets/images/logo-white.svg";

export default function Logo() {
    return (
        <Link to="/" className="w-full flex justify-center">
            <img src={logo} className="w-6/12"/>
        </Link>
    )
}