import axios from 'axios';
import { sendScore } from "../helpers/game.helper";

const strapiUrl = import.meta.env.VITE_STRAPI_URL;

const getTriviaQuestions = async () => {
    // TODO: Keep a list of triva IDs already played by an user, try local storage.    
    let config = {
        headers: {
            Authorization: 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN,
        }
    }

    try {
        const response = await axios.get(`${strapiUrl}/api/trivia-games?populate=questions`, config)

        const data = response.data.data[Math.floor(Math.random()*response.data.data.length)]
      
        return data.attributes;
    } catch (error) {
        // handle error, for now log
        console.log(error);
    }
}


const getTriviaScoreboard = async () => {
  // TODO: Keep a list of triva IDs already played by an user, try local storage.    
  let config = {
      headers: {
          Authorization: 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN,
      }
  }

  try {
      const response = await axios.get(`${strapiUrl}/api/scores?filters[game][$eq]=trivia`, config)

      // const data = response.data.data[Math.floor(Math.random()*response.data.data.length)]
    
      return response.data;
  } catch (error) {
      // handle error, for now log
      console.log(error);
  }
}

// const sendScore = async ({data} : {data: ScoreType }) => {
//     // TODO: Finish calling this outside and send the mf data...
//     // const scoreData = {
//     //     playerId: data.playerId,
//     //     playerName: data.playerName, 
//     //     playerCompany: data.playerCompany, 
//     //     scoreValue: data.scoreValue,
//     //     scoreType: data.scoreType,
//     //     game: data.game
//     // };

    
//     const scoreData = { data: data };

//     try {
//     //   setLoading(true);
//       const response = await axios.post(`${strapiUrl}/api/scores`, scoreData, {
//         headers: {
//           Authorization: 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN,
//         },
//       });
      
//       return response.data;
//     //   setLoading(false);
//     } catch (error) {
//       console.error('Error sending score data:', error);

//       return error;
//     }
//   };

  const sendTriviaData = async (scoreData: ScoreType) => {
    try {
      const response = await sendScore({data: scoreData});
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

export { getTriviaQuestions, sendTriviaData, getTriviaScoreboard };