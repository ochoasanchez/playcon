import axios from 'axios';
import escudoFeliz from "../assets/images/escudo-feliz.gif";
import escudoTriste from "../assets/images/escudo-triste.gif";
import escudoBurla from "../assets/images/escudo-burla.gif";

const strapiUrl = import.meta.env.VITE_STRAPI_URL;
const bearerToken = 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN;

const sendScore = async ({data} : {data: ScoreType }) => {

  // const scoreData = { data: data };
  const scoreData = { data };

  try {
    const response = await axios.post(`${strapiUrl}/api/scores`, scoreData, {
      headers: {
        Authorization: bearerToken,
      },
    });
    
    return response.data;

  } catch (error) {
    console.error('Error sending score data:', error);

    return error;
  }
};

function getResultMessage(scoreValue: number, game: string) {
  
  const badMessage = "Hoy como que no es tu día de suerte";
  const regularMessage = "Parece que estás entrando en granjas desconocidas";
  const goodMessage = "Estamos en una academia de genios y tú pareces el líder";

  if (game === "trivia") {
    if (scoreValue < 3) {
        return {
            image: escudoTriste,
            message: badMessage,
        };
    } else if (scoreValue < 5) {
        return {
            image: escudoBurla,
            message: regularMessage,
        };
    } else {
        return {
            image: escudoFeliz,
            message: goodMessage,
        };
    }
  }

  // Memory
  if (scoreValue/1000 <= 30) {
    // debugger;
      return {
          image: escudoFeliz,
          message: goodMessage,
      };
  } else if (scoreValue/1000 < 50) {
    // debugger;
      return {
          image: escudoBurla,
          message: regularMessage,
      };
  } else {
    // debugger;
      return {
          image: escudoTriste,
          message: badMessage,
      };
  }
}
  
export { sendScore, getResultMessage };