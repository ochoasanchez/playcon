import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Nav from "../components/Nav";
import { ActionButton } from '../components/ActionButton';

export function Form() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        company: "",
        position: ""
    });

    localStorage.clear();
    
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        const isFormInvalid = formData.name === "" || formData.phone === "" || formData.company === "" || formData.position === "";   
        
        if (isFormInvalid) return;

        e.preventDefault();
        setLoading(true);
        
        const token = import.meta.env.VITE_STRAPI_TOKEN;
        const data = { data: formData };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        try {
            const response = await axios.post('http://localhost:1337/api/clients', data, config);
            console.log('Data submitted successfully:', response.data);

            localStorage.setItem('userData', JSON.stringify(response.data));
            localStorage.setItem('userHasPlayed', "false");
            localStorage.setItem('userIsRegistered', "false");

            navigate("/menu");
            // debugger;
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="h-lvh w-full flex flex-col items-center justify-center px-4 md:px-0">
            <header className="text-center animate-slide-in-1 px-6">
                <h1 className="text-6xl font-bold">
                    ¡Completa este formulario y empieza el desafío!
                </h1>
                {/* <p className="text-xl mt-4">Completa nuestro formulario y recibe actualizaciones, ofertas especiales y contenido exclusivo de nuestra empresa</p> */}
            </header>
            <div className="flex flex-col w-full md:w-8/12 lg:w-3/12 mt-8">
                <form className="flex flex-col text-2xl" onSubmit={handleSubmit}>
                    <div className="animate-slide-in-1 mt-4">
                        <label htmlFor="name">Nombre y Apellido</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            className="flex w-full rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"
                        />
                    </div>
                    {/* <div className="animate-slide-in-2 mt-4">
                        <label htmlFor="email">Correo electrónico</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="flex w-full rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"
                        />
                    </div> */}
                    <div className="animate-slide-in-3 mt-4">
                        <label htmlFor="phone">Teléfono</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            className="flex w-full rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"
                        />
                    </div>
                    <div className="animate-slide-in-4 mt-4">
                        <label htmlFor="company">Compañía</label>
                        <input 
                            type="text" 
                            name="company" 
                            value={formData.company}
                            onChange={handleChange}
                            className="flex w-full rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"
                        />
                    </div>
                    <div className="animate-slide-in-4 mt-4">
                        <label htmlFor="position">Cargo</label>
                        <input 
                            type="text" 
                            name="position" 
                            value={formData.position}
                            onChange={handleChange}
                            className="flex w-full rounded-md px-3 py-4 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 outline-none text-black"
                        />
                    </div>
                    <p className="text-3xl mt-8 text-center font-bold">¡Compite y participa por premios sopresa!</p>
                    <ActionButton type="submit" text="Siguiente" disabled={loading}/>
                    {/* <button type="submit"  className="bg-orange-500 rounded-full mt-8 py-4 animate-slide-in-5 uppercase font-bold text-2xl" disabled={loading}>Siguiente</button> */}
                    <Nav />
                </form>
            </div>
        </div>
    );
}
