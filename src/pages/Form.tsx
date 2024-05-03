// import { Link } from "react-router-dom";
import Nav from "../components/Nav";

export function Form() {
    
    return (
        <div className="h-lvh w-full flex flex-col items-center justify-center px-4 md:px-0">
            <header className="text-center animate-slide-in-1">
                <h1 className="text-6xl font-bold">
                    Formulario de clientes
                </h1>
                <p className="text-xl mt-4">Completa nuestro formulario y recibe actualizaciones, ofertas especiales y contenido exclusivo de nuestra empresa</p>
            </header>
            <div className="flex flex-col w-full md:w-8/12 lg:w-3/12 mt-4">
                <form className="flex flex-col">
                    <div className="animate-slide-in-1 mt-4">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" className="flex w-full rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"></input>
                    </div>
                    <div className="animate-slide-in-2 mt-4">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" name="email" className="flex w-full rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"></input>
                    </div>
                    <div className="animate-slide-in-3 mt-4">
                        <label htmlFor="email">Teléfono</label>
                        <input type="tel" name="phone" className="flex w-full rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"></input>
                    </div>
                    <div className="animate-slide-in-4 mt-4">
                        <label htmlFor="company">Compañía</label>
                        <input type="text" name="company" className="flex w-full rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"></input>
                    </div>
                    <button className="bg-orange-500 rounded-md mt-8 py-4 animate-slide-in-5 uppercase font-bold">Enviar</button>
                    <Nav />
                </form>
            </div>
        </div>
    )
}