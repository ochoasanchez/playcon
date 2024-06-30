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

    // localStorage.clear();
    
    const [loading, setLoading] = useState(false);
    const [isPlayer, setIsPlayer] = useState(false);
    const navigate = useNavigate();
    const { player } = useParams<{ player?: string }>();  // useParams to capture player parameter
    // debugger;

    useEffect(() => {
        if (player) {
            setIsPlayer(true);  
            console.log("Player parameter:", player);
            // debugger;
        } else {
            setIsPlayer(false);
            console.log("Player parameter not found");
            // debugger;
        }
    }, [player]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isFormInvalid = formData.name === "" || formData.phone === "" || formData.company === "" || formData.position === "";   
        if (isFormInvalid) return;

        setLoading(true);
        
        const token = import.meta.env.VITE_STRAPI_TOKEN;
        const data = { data: formData };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        try {
            // TODO post to 'Participants'
            const response = await axios.post('http://localhost:1337/api/clients', data, config);
            console.log('Data submitted successfully:', response.data);

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

    return (
        <main>
            <Logo />
            <header className="text-center animate-slide-in-1">
                { isPlayer && <h1 className="main__title">
                    ¡Completa este formulario <br/>y empieza el desafío!
                </h1>}
                { !isPlayer && <h1 className="main__title">
                    ¡Completa este formulario!
                </h1>}
                
            </header>
            <div className="flex flex-col w-full md:w-8/12 lg:w-8/12 mt-8">
                <form className="flex flex-col gap-y-8" onSubmit={handleSubmit}>
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
                    {/* <p className="text-3xl mt-8 text-center font-bold">¡Compite y participa por premios sopresa!</p> */}
                    <ActionButton type="submit" text="Siguiente" disabled={loading} className='mt-6 rounded-md'/>
                    <Nav />
                </form>
            </div>
        </main>
    );
}
