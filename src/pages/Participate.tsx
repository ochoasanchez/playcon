import icons from "../assets/images/icons.png";
import Nav from "../components/Nav";
import { ActionButton } from "../components/ActionButton";
import { useState } from "react";
import { signUpParticipant } from "../helpers/raffle.helper";
import escudoFeliz from "../assets/images/escudo-feliz.gif";
import Loader from "../components/Loader";

export function Participate() {
  const [isLoading, setIsloading] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const userHasPlayed = JSON.parse(
    localStorage.getItem("userHasPlayed") || "{}",
  );
  const userIsRegistered = true;

  if (isLoading) return <Loader />;

  if (userIsRegistered === true) {
    return (
      <main className="animate-slide-in-1 px-12">
        <img src={escudoFeliz} className="w-10/12" alt="Result" />
        <p className="main__title mt-4 font-bold">¡Gracias por registrarte!</p>
        <ActionButton url="/" text="Volver" className="mt-8" />
      </main>
    );
  }

  const sendData = async () => {
    setIsloading(true);

    if (userIsRegistered === "true") return;

    const participantData: ParticipantType = {
      userId: userData.data.id,
      userName: userData.data.attributes.name,
      userCompany: userData.data.attributes.company,
      userPhone: userData.data.attributes.phone,
      level: 1,
      hasPlayed: userHasPlayed === "true",
    };
    try {
      const response = await signUpParticipant(participantData);
      setIsloading(false);
      console.log("Raffle response:", response);

      localStorage.setItem("userIsRegistered", "true");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <main className="animate-slide-in-1 px-12">
      <div className="flex w-full flex-col py-6 text-center md:w-10/12 lg:w-8/12">
        <h1 className="mt-2 text-6xl font-bold uppercase">
          ¡Participa y gana!
        </h1>
        <p className="mt-8 text-3xl font-bold">
          Regístrate ahora y gana un
          <br /> premio sensacional
        </p>
      </div>
      <div className="mt-4 flex w-full flex-col text-center md:w-8/12 lg:w-3/12">
        <ActionButton onClick={sendData} text="Registrarse" />

        <img src={icons} className="mt-16" />
        <Nav />
        {/* <p>No eres Juan? Empieza una nueva partida</p> */}
      </div>
    </main>
  );
}
