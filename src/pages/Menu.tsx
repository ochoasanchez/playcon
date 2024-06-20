// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-blanco.png";
import icons from "../assets/images/icons.png";
import Nav from "../components/Nav";

// TODO: Video or image background

export function Menu() {

    const user = localStorage.userData ? JSON.parse(localStorage.userData) : "";
    const userName = localStorage.userData ? user.data.attributes.name.replace(/ .*/,'') : "";
    
    return (
        <div className="h-lvh w-full flex flex-col items-center justify-center px-4 md:px-0 animate-slide-in-1">
            <img src={logo} className="w-64"/>
            {/* <p className="mt-4">Producción y Comercialización de productos químicos 🧪</p> */}
            <div className="flex flex-col w-full md:w-8/12 lg:w-8/12 text-center py-6">
                <h1 className="text-6xl font-bold mt-2 uppercase">¡Es hora de la verdad{user !== "" ? `, ${userName}` : ""}!</h1>
                <p className="text-3xl mt-8 font-bold">¿A qué quieres enfrentarte?</p>
            </div>
            <div className="flex flex-col w-full md:w-8/12 lg:w-3/12 mt-8 text-center">
            <Link to="/trivia"  className="bg-orange-500 rounded-full py-4 font-bold uppercase text-2xl">Desafío mental</Link>
            <Link to="/memory"  className="bg-orange-500 rounded-full py-4 font-bold uppercase mt-4 text-2xl">Mikia memory challenge</Link>
            
            <img src={icons} className="mt-16"/>
            <Nav />
            {/* <p>No eres Juan? Empieza una nueva partida</p> */}
            </div>
        </div>
    )
}