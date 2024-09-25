import { Link } from "react-router-dom";
import logo from "../assets/images/logo-white.svg";

export default function Logo() {
  return (
    <Link to="/" className="flex w-full justify-center">
      <img src={logo} className="w-5/12" />
    </Link>
  );
}
