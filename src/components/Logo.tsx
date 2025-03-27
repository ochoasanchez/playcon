import { Link } from "react-router-dom";
import logo from "../assets/images/logo-fc.png";

export default function Logo() {
  return (
    <Link to="/" className="flex w-full justify-center">
      <img src={logo} className="w-4/12" />
    </Link>
  );
}
