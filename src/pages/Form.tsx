import { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import axios from "axios";
import { ActionButton } from "../components/ActionButton";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../components/Logo";
import { MainTitle } from "../components/MainTitle";
import { addUser } from '../utils/db'; // Import the IndexedDB helper functions

export function Form() {
  // localStorage.clear();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    position: "",
    email: "",
    isActive: true,
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    phone: false,
    company: false,
    position: false,
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

  // async function handleFormSubmit() {
  //   setShowModal(false);
  //   setLoading(true);

  //   const userlist = JSON.parse(localStorage.getItem("users") || "[]");

  //   const newUserList = [...userlist, formData];

  //   localStorage.setItem("users", JSON.stringify(newUserList));
  //   localStorage.setItem("currentUser", JSON.stringify(formData));
  //   localStorage.setItem("userHasPlayed", "false");
  //   localStorage.setItem("userIsRegistered", "false");
  //   localStorage.removeItem("playedTriviaIds");

  //   setLoading(false);
  //   isPlayer ? navigate("/menu") : navigate("/participate");
  // }



async function handleFormSubmitIDB() {
  setShowModal(false);
  setLoading(true);

  try {
    // Add the new user to IndexedDB
    await addUser(formData);

    // Store current user and other flags in localStorage (or you can move these to IndexedDB as well)
    localStorage.setItem("currentUser", JSON.stringify(formData));
    localStorage.setItem("userHasPlayed", "false");
    localStorage.setItem("userIsRegistered", "false");
    localStorage.removeItem("playedTriviaIds");

    setLoading(false);
    isPlayer ? navigate("/menu") : navigate("/participate");
  } catch (error) {
    console.error("Error saving user data:", error);
    setLoading(false);
    // Handle the error (e.g., show a message to the user)
  }
}

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (fieldErrors[e.target.name as keyof typeof fieldErrors]) {
      setFieldErrors({
        ...fieldErrors,
        [e.target.name]: false,
      });
    }
  };

  const validateFields = () => {
    const errors = {
      name: formData.name === "",
      phone: formData.phone === "",
      company: formData.company === "",
      position: formData.position === "",
    };

    setFieldErrors(errors);

    return !Object.values(errors).includes(true);
  };

  const confirmFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      setShowModal(true);
      // handleFormSubmit();
    }
  };

  const handleGoBack = () => {
    setShowModal(false);
  };

  return (
    <main className="gap-4 sm:gap-6">
      <div className="flex w-full justify-center px-4">
        <Logo />
      </div>
      <div className="px-4 text-center">
        {isPlayer ? (
          <h1 className="text-center text-5xl sm:text-6xl font-bold">
            ¡Completa este formulario <br /> y empieza el desafío!
          </h1>
        ) : (
          <MainTitle text="¡Completa este formulario!" />
        )}
      </div>
      <div className="flex w-full flex-col sm:w-10/12">
        <form className="flex flex-col gap-y-2 px-4 sm:px-0" onSubmit={confirmFormSubmit}>
          <div>
            <label className="form__label" htmlFor="name">
              Nombre y Apellido <span>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form__input ${fieldErrors.name ? "form__input--empty" : ""}`}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="company">
              Compañía <span>*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`form__input ${fieldErrors.company ? "form__input--empty" : ""}`}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="position">
              Cargo <span>*</span>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={`form__input ${fieldErrors.position ? "form__input--empty" : ""}`}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="phone">
              Teléfono <span>*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form__input ${fieldErrors.phone ? "form__input--empty" : ""}`}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form__input"
            />
          </div>
          <ActionButton
            type="submit"
            text="Siguiente"
            disabled={loading}
            className="mt-2 rounded-xl"
          />
          {/* <p className='text-yellow-300 text-4xl text-center'>(*) Campos obligatorios</p> */}
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="flex w-10/12 flex-col gap-4 sm:gap-8 rounded-md bg-white px-2 sm:px-6 py-4 sm:py-16">
            <p className="text-center text-2xl sm:text-5xl text-black">
              ¿Confirmas que deseas enviar este formulario?
            </p>
            <div className="flex justify-around gap-4 sm:gap-12 px-4 sm:px-8">
              <ActionButton
                onClick={handleGoBack}
                text="Volver"
                size="small"
                className="btn-alternate border-4 border-green-500"
              />
              <ActionButton onClick={handleFormSubmitIDB} text="Enviar" size="small" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
