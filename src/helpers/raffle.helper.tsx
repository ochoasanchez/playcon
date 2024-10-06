import axios from "axios";

const strapiUrl = import.meta.env.VITE_STRAPI_URL;
const bearerToken = "Bearer " + import.meta.env.VITE_STRAPI_TOKEN;

const config = {
  headers: {
    Authorization: bearerToken,
  },
};

const signUpParticipant = async (data: ParticipantType) => {
  const participantData = { data };

  try {
    const response = await axios.post(
      `${strapiUrl}/api/participants`,
      participantData,
      config,
    );
    console.log("signUpResponse:", response);

    return response.data;
  } catch (error) {
    console.error("Error sending score data:", error);

    return error;
  }
};

const getRaffleParticipants = async (
  raffleType?: "main" | "trivia" | "memory",
) => {
  if (!raffleType || raffleType === "main") {
    try {
      const response = await axios.get(`${strapiUrl}/api/clients`, config);
      console.log("Participants:", response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error getting participants data:", error);

      return error;
    }
  }
  if (raffleType === "memory") {
    try {
      const response = await axios.get(
        `${strapiUrl}/api/scores?filters[game][$eq]=memory`,
        config,
      );
      console.log("Memory Participants:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting memory participants data:", error);

      return error;
    }
  }
  if (raffleType === "trivia") {
    try {
      const response = await axios.get(
        `${strapiUrl}/api/scores?filters[game][$eq]=trivia&filters[scoreValue][$gte]=4`,
        config,
      );
      console.log("Trivia Participants:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting trivia participants data:", error);

      return error;
    }
  }
};

export { signUpParticipant, getRaffleParticipants };
