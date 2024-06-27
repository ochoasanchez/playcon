import axios from 'axios';
import { sendScore } from './game.helper';

const strapiUrl = import.meta.env.VITE_STRAPI_URL;

const getMemoryCards = async () => {
    // TODO: Keep a list of memory IDs already played by an user, try local storage.    
    let config = {
        headers: {
        'Authorization': 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN,
        }
    }

    try {
        const response = await axios.get(`${strapiUrl}/api/memory-games?populate=cards`, config)

        // TODO: Process data and randomly get an element of the array/ for now log

        const cards = response.data.data[0].attributes.cards.data;
        console.log(cards);
        // debugger;

        return cards;
    } catch (error) {
        // handle error, for now log
        console.log(error);
    }
}



const getMemoryScoreboard = async () => {
  // TODO: Keep a list of triva IDs already played by an user, try local storage.    
  let config = {
      headers: {
          Authorization: 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN,
      }
  }

  try {
      const response = await axios.get(`${strapiUrl}/api/scores?filters[game][$eq]=memory`, config)

      // const data = response.data.data[Math.floor(Math.random()*response.data.data.length)]
    
      return response.data;
  } catch (error) {
      // handle error, for now log
      console.log(error);
  }
}


// const sendMemoryData = async ({data} : {data: ScoreType }) => {
//     // TODO:  FINISH SENDING MEMORY DATA

    
//     const scoreData = { data: data };

//     try {
//       const response = await axios.post(`${strapiUrl}/api/scores`, scoreData, {
//         headers: {
//           Authorization: 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN,
//         },
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error('Error sending score data:', error);

//       return error;
//     }
// };

const sendMemoryData = async (scoreData: ScoreType) => {
    // debugger;
    try {
      const response = await sendScore({data: scoreData});
      console.log('Data submitted successfully:', response.data);
    //   debugger;
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

export {getMemoryCards, sendMemoryData, getMemoryScoreboard};