import { Link } from "react-router-dom";

export function Home() {
    
    return (
        <div className="h-lvh w-full flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold">
                Formulario
            </h1>
            <div className="flex flex-col w-3/12 mt-4">
                <form className="flex flex-col">
                    <label htmlFor="name" className="mt-4">Nombre</label>
                    <input type="text" name="name" className="flex rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"></input>
                    <label htmlFor="email" className="mt-4">Correo electrónico</label>
                    <input type="text" name="email" className="flex rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"></input>
                    <label htmlFor="company" className="mt-4">Compañía</label>
                    <input type="text" name="company" className="flex rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"></input>
                    <button className="bg-orange-500 rounded-md mt-8 py-4">Enviar</button>
                    <Link to="/trivia" className="text-white mt-4">Trivia</Link>
                </form>
            </div>
        </div>
    )
}