import axios from 'axios';

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

const sendScore = async ({data} : {data: ScoreType }) => {
    // TODO: Finish calling this outside and send the mf data
    const scoreData = {
        playerId: data.playerId,
        playerName: data.playerName, 
        playerCompany: data.playerCompany, 
        scoreValue: data.scoreValue,
        scoreType: data.scoreType,
        game: data.game
    };

    try {
    //   setLoading(true);
      const response = await axios.post(`${strapiUrl}/api/scores`, scoreData, {
        headers: {
          Authorization: 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN,
        },
      });
      
      return response.data;
    //   setLoading(false);
    } catch (error) {
      console.error('Error sending score data:', error);

      return error;
    }
  };

export {getTriviaQuestions, sendScore};