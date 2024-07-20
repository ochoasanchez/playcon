import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { ActionButton } from '../components/ActionButton';
import { useNavigate, useParams } from "react-router-dom";
import Logo from '../components/Logo';

export function Form() {
    localStorage.clear();
    
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        company: "",
        position: "",
        email: ""
    });

    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        phone: false,
        company: false,
        position: false
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

    async function testSubmit() {
        setShowModal(false);
        setLoading(true);

        const token = import.meta.env.VITE_STRAPI_TOKEN;
        const url = import.meta.env.VITE_STRAPI_URL;
        const data = { data: formData };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        try {
            const response = await axios.post(`${url}/api/clients`, data, config);
            localStorage.setItem('userData', JSON.stringify(response.data));
            localStorage.setItem('userHasPlayed', "false");
            localStorage.setItem('userIsRegistered', "false");

            isPlayer ? navigate("/menu") : navigate("/participate");
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (fieldErrors[e.target.name as keyof typeof fieldErrors]) {
            setFieldErrors({
                ...fieldErrors,
                [e.target.name]: false
            });
        }
    };

    const validateFields = () => {
        const errors = {
            name: formData.name === "",
            phone: formData.phone === "",
            company: formData.company === "",
            position: formData.position === ""
        };

        setFieldErrors(errors);

        return !Object.values(errors).includes(true);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateFields()) {
            // setShowModal(true);
            testSubmit();
        }
        
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
        <main className='gap-4'>
            <div className="flex justify-center px-12 w-full">
                <Logo />
            </div>
            <div className="text-center animate-slide-in-1 px-12">
                { isPlayer ? <h1 className="main__title">¡Completa este formulario y empieza <br />el desafío!</h1> : <h1 className="main__title">¡Completa este formulario!</h1> }
            </div>
            <div className="flex flex-col w-full md:w-8/12 lg:w-8/12">
                <form className="flex flex-col gap-y-2" onSubmit={handleFormSubmit}>
                    <div className="flex gap-x-6 animate-slide-in-3">
                        <div className="w-full">
                            <label className="form__label" htmlFor="name">Nombre y Apellido <span>*</span></label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                className={`form__input ${fieldErrors.name ? 'form__input--empty' : ''}`}
                            />
                        </div>
                        <div className="w-full">
                            <label className="form__label" htmlFor="company">Compañía <span>*</span></label>
                            <input 
                                type="text" 
                                name="company" 
                                value={formData.company}
                                onChange={handleChange}
                                className={`form__input ${fieldErrors.company ? 'form__input--empty' : ''}`}
                            />
                        </div>
                    </div>  
                    <div className="flex gap-x-6 animate-slide-in-4">
                        <div className="w-full">
                            <label className="form__label" htmlFor="position">Cargo <span>*</span></label>
                            <input 
                                type="text" 
                                name="position" 
                                value={formData.position}
                                onChange={handleChange}
                                className={`form__input ${fieldErrors.position ? 'form__input--empty' : ''}`}
                            />
                        </div>
                        <div className="w-full">
                            <label className="form__label" htmlFor="phone">Teléfono <span>*</span></label>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone}
                                onChange={handleChange}
                                className={`form__input ${fieldErrors.phone ? 'form__input--empty' : ''}`}
                            />
                        </div>

                    </div>
                    <div className="animate-slide-in-5">
                        <label className="form__label" htmlFor="email">Correo electrónico</label>
                        <input 
                            type="text" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="form__input"
                        />
                    </div>
                    <ActionButton type="submit" text="Siguiente" disabled={loading} className='mt-2 rounded-xl animate-slide-in-5'  size='small'/>
                    {/* <p className='text-yellow-300 text-4xl text-center'>(*) Campos obligatorios</p> */}
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md flex flex-col w-10/12 gap-16 py-16">
                        <p className="text-6xl text-center text-black">¿Confirmas que deseas enviar<br /> este formulario?</p>
                        <div className="flex justify-around px-12 gap-12">
                            <ActionButton onClick={handleGoBack} text="Volver" size='small' className='btn-alternate border-4 border-orange-500'/>
                            <ActionButton onClick={testSubmit} text="Enviar" size='small' />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
