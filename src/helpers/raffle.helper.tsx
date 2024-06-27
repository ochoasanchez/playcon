import axios from 'axios';

const strapiUrl = import.meta.env.VITE_STRAPI_URL;
const bearerToken = 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN;

const signUpParticipant = async (data: ParticipantType ) => {

    // const scoreData = { data: data };
    const participantData = { data };

    try {
      const response = await axios.post(`${strapiUrl}/api/participants`, participantData, {
        headers: {
          Authorization: bearerToken,
        },
      });
      console.log('signUpResponse:', response)
      // debugger;
      
      return response.data;

    } catch (error) {
      console.error('Error sending score data:', error);

      return error;
    }
  };

  

const getRaffleParticipants = async () => {
    try {
      const response = await axios.get(`${strapiUrl}/api/participants`, {
        headers: {
          Authorization: bearerToken,
        },
      });
      console.log('Participants:', response.data)
      // debugger;
      return response.data;
  
    } catch (error) {
      console.error('Error getting participants data:', error);
  
      return error;
    }
  }
  
  export { signUpParticipant, getRaffleParticipants };