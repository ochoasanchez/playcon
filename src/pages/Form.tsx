import { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import axios from "axios";
import { ActionButton } from "../components/ActionButton";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../components/Logo";

export function Form() {
  // localStorage.clear();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    position: "",
    email: "",
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

  async function handleFormSubmit() {
    setShowModal(false);
    setLoading(true);

    let userlist = JSON.parse(localStorage.getItem("users") || "[]");

    const newUserList = [...userlist, formData];

    localStorage.setItem("users", JSON.stringify(newUserList));
    localStorage.setItem("currentUser", JSON.stringify(formData));
    localStorage.setItem("userHasPlayed", "false");
    localStorage.setItem("userIsRegistered", "false");

    setLoading(false);
    isPlayer ? navigate("/menu") : navigate("/participate");
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
    <main className="gap-16">
      <div className="flex w-full justify-center px-12">
        <Logo />
      </div>
      <div className="animate-slide-in-1 px-12 text-center">
        {isPlayer ? (
          <h1 className="main__title">
            ¡Completa este formulario y empieza <br />
            el desafío!
          </h1>
        ) : (
          <h1 className="main__title">¡Completa este formulario!</h1>
        )}
      </div>
      <div className="flex w-full flex-col md:w-8/12 lg:w-8/12">
        <form className="flex flex-col gap-y-6" onSubmit={confirmFormSubmit}>
          <div className="animate-slide-in-1">
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
          <div className="animate-slide-in-2">
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
          <div className="animate-slide-in-3">
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
          <div className="animate-slide-in-4">
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
          <div className="animate-slide-in-5">
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
            className="animate-slide-in-5 mt-6 rounded-xl"
          />
          {/* <p className='text-yellow-300 text-4xl text-center'>(*) Campos obligatorios</p> */}
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="flex w-10/12 flex-col gap-16 rounded-md bg-white p-6 py-16">
            <p className="text-center text-6xl text-black">
              ¿Confirmas que deseas enviar
              <br /> este formulario?
            </p>
            <div className="flex justify-around gap-12 px-12">
              <ActionButton
                onClick={handleGoBack}
                text="Volver"
                size="small"
                className="btn-alternate border-4 border-orange-500"
              />
              <ActionButton onClick={handleFormSubmit} text="Enviar" size="small" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
