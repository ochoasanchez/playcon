import { Link } from "react-router-dom";
import logo from "../assets/images/joystick.png";

export default function Logo({ size = "small" }) {
  const widthClass = size === "large" ? "w-5/12" : "w-4/12";
  
  return (
    <Link to="/" className="flex w-full justify-center">
      <img src={logo} className={widthClass} />
    </Link>
  );
}