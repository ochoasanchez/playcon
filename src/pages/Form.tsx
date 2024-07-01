import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Nav from "../components/Nav";
import { ActionButton } from '../components/ActionButton';
import { useNavigate, useParams } from "react-router-dom";
import Logo from '../components/Logo';

export function Form() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        company: "",
        position: "",
        email: ""
    });

    const [loading, setLoading] = useState(false);
    const [isPlayer, setIsPlayer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { player } = useParams<{ player?: string }>();  

    useEffect(() => {
        if (player) {
            setIsPlayer(true);  
        } else {
            setIsPlayer(false);
        }
    }, [player]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleSubmit = async () => {
        setShowModal(false);
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
            localStorage.setItem('userData', JSON.stringify(response.data));
            localStorage.setItem('userHasPlayed', "false");
            localStorage.setItem('userIsRegistered', "false");

            isPlayer ? navigate("/menu") : navigate("/participate");
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setShowModal(false);
    };

    return (
        <main>
            <Logo />
            <header className="text-center animate-slide-in-1">
                { isPlayer ? <h1 className="main__title">¡Completa este formulario <br/>y empieza el desafío!</h1> : <h1 className="main__title">¡Completa este formulario!</h1> }
            </header>
            <div className="flex flex-col w-full md:w-8/12 lg:w-8/12 mt-8">
                <form className="flex flex-col gap-y-8" onSubmit={handleFormSubmit}>
                    <div className="animate-slide-in-1">
                        <label className="form__label" htmlFor="name">Nombre y Apellido</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            className="form__input"
                        />
                    </div>
                    <div className="animate-slide-in-2">
                        <label className="form__label" htmlFor="company">Compañía</label>
                        <input 
                            type="text" 
                            name="company" 
                            value={formData.company}
                            onChange={handleChange}
                            className="form__input"
                        />
                    </div>
                    <div className="animate-slide-in-3">
                        <label className="form__label" htmlFor="position">Cargo</label>
                        <input 
                            type="text" 
                            name="position" 
                            value={formData.position}
                            onChange={handleChange}
                            className="form__input"
                        />
                    </div>
                    <div className="animate-slide-in-4">
                        <label className="form__label" htmlFor="phone">Teléfono</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            className="form__input"
                        />
                    </div>
                    <div className="animate-slide-in-5">
                        <label className="form__label" htmlFor="email">Correo electrónico</label>
                        <input 
                            type="tel" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="form__input"
                        />
                    </div>
                    <ActionButton type="submit" text="Siguiente" disabled={loading} className='mt-6 rounded-md'/>
                    <Nav />
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md flex flex-col w-10/12 gap-12 py-12">
                        <p className="text-6xl text-center text-black">¿Confirmas que deseas enviar<br /> este formulario?</p>
                        <div className="flex justify-center gap-12">
                            <ActionButton onClick={handleGoBack} text="Volver" size='small' className='btn-alternate border-4 border-orange-500'/>
                            <ActionButton onClick={handleSubmit} text="Enviar" size='small' />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
