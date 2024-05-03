// import { Link } from "react-router-dom";
import MikiaLogo from "../assets/images/logo.jpg";
import Nav from "../components/Nav";

// TODO: Video or image background

export function Home() {
    
    return (
        <div className="h-lvh w-full flex flex-col items-center justify-center px-4 md:px-0 animate-fade-in">
            <img src={MikiaLogo} className="w-40 h-40 rounded-full"/>
            {/* <p className="mt-4">Producción y Comercialización de productos químicos 🧪</p> */}
            <div className="flex flex-col w-full md:w-8/12 lg:w-8/12 text-center py-6">
                
            <h1 className="text-5xl font-bold mt-2">¡Bienvenidos a nuestro stand!</h1>
            <p className="text-xl mt-4">Descubre el mundo de la producción y comercialización de productos químicos con nosotros 🧪 </p>
                {/* <form className="flex flex-col">
                    <label htmlFor="name" className="mt-4">Nombre</label>
                    <input type="text" name="name" className="flex rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"></input>
                    <label htmlFor="email" className="mt-4">Correo electrónico</label>
                    <input type="text" name="email" className="flex rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"></input>
                    <label htmlFor="company" className="mt-4">Compañía</label>
                    <input type="text" name="company" className="flex rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"></input>
                    <button className="bg-orange-500 rounded-md mt-8 py-4">Enviar</button>
                    <Link to="/trivia" className="text-white mt-4">Trivia</Link>
                </form> */}
            </div>
            <div className="flex flex-col w-full md:w-8/12 lg:w-3/12 mt-4 text-center">
                <button className="bg-orange-500 rounded-full py-4 uppercase font-bold animate-bounce">Empezar</button>
                <Nav />
            </div>
        </div>
    )
}