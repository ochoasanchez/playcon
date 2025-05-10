import { Link } from "react-router-dom";
import logo from "../assets/images/megalabs_blanco.svg";

export default function Logo({ size = "small" }) {
  const widthClass = size === "large" ? "w-8/12" : "w-6/12";
  
  return (
    <Link to="/" className="flex w-full justify-center">
      <img src={logo} className={widthClass} />
    </Link>
  );
}