import axios from 'axios';

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
        debugger;

        return cards;
    } catch (error) {
        // handle error, for now log
        console.log(error);
    }
}

export default getMemoryCards;