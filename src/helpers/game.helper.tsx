import axios from "axios";
import escudoFeliz from "../assets/images/happy.png";
import escudoTriste from "../assets/images/sad.png";
import escudoBurla from "../assets/images/laugh.png";

const strapiUrl = import.meta.env.VITE_STRAPI_URL;
const bearerToken = `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`;

const updateUsers = async () => {
  
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const config = {
      headers: {
          Authorization: bearerToken,
      },
  }

  let counter = 0;

  try {
    for (const user of users) {
      const data = { data: user };  
      const response = await axios.post(`${strapiUrl}/api/clients`, data, config);

      console.log("User successfully sync: ", response);

      counter++;
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  } finally {
    console.log(`Looped through ${counter} users`);
  }
};


const sendScore = async ({ data }: { data: ScoreType }) => {
  const scoreData = { data };

  try {
    const response = await axios.post(`${strapiUrl}/api/scores`, scoreData, {
      headers: {
        Authorization: bearerToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error sending score data:", error);

    return error;
  }
};

const saveScore =  ({ data, game }: { data: ScoreType, game: "trivia" | "memory" }) => {
  const scoreData = data;
  const scoreboard = JSON.parse(localStorage.getItem(`${game}Scoreboard`) || "[]");

  const newScoreboard =  [...scoreboard, scoreData];
  localStorage.setItem(`${game}Scoreboard`, JSON.stringify(newScoreboard));
};

function getResultMessage(scoreValue: number, game: string) {
  const badMessage = "Las estrellas no se alinearon hoy… ¡La próxima será tu revancha!";
  const regularMessage = "Sé que puedes dar aún más. ¡Sigue así!";
  const goodMessage = "Alguien aquí merece una medalla… ¡Excelente trabajo";

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
  if (scoreValue / 1000 <= 30) {
    return {
      image: escudoFeliz,
      message: goodMessage,
    };
  } else if (scoreValue / 1000 < 50) {
    return {
      image: escudoBurla,
      message: regularMessage,
    };
  } else {
    return {
      image: escudoTriste,
      message: badMessage,
    };
  }
}

export { sendScore, getResultMessage, saveScore, updateUsers };
