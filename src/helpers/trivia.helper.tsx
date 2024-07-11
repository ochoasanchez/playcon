import axios from 'axios';
import { sendScore } from "../helpers/game.helper";

const strapiUrl = import.meta.env.VITE_STRAPI_URL;

const getTriviaQuestions = async () => {
    let config = {
        headers: {
            Authorization: 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN,
        }
    }

    try {
        const response = await axios.get(`${strapiUrl}/api/trivia-games?populate=questions`, config);
        const triviaList = response.data.data;

        // Get played trivia IDs from localStorage
        let playedTriviaIds = JSON.parse(localStorage.getItem('playedTriviaIds') || '[]');
        if (!Array.isArray(playedTriviaIds)) {
            playedTriviaIds = [];
        }

        // debugger;
        
        // Find an unplayed trivia
        const unplayedTrivia = triviaList.find((trivia:any) => !playedTriviaIds.includes(trivia.id));
        // debugger;
        

        if (unplayedTrivia) {
            // Save the unplayed trivia ID to localStorage
            playedTriviaIds.push(unplayedTrivia.id);
            localStorage.setItem('playedTriviaIds', JSON.stringify(playedTriviaIds));
            
            // debugger;
            return unplayedTrivia.attributes;
        } else {
            // If all trivia questions have been played
                
            // debugger;
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getTriviaScoreboard = async () => {
    let config = {
        headers: {
            Authorization: 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN,
        }
    }

    try {
        const response = await axios.get(`${strapiUrl}/api/scores?filters[game][$eq]=trivia`, config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const sendTriviaData = async (scoreData: ScoreType) => {
    try {
        const response = await sendScore({ data: scoreData });
        console.log('Data submitted successfully:', response.data);
    } catch (error) {
        console.error('Error submitting data:', error);
        throw error;
    }
};

export { getTriviaQuestions, sendTriviaData, getTriviaScoreboard };
