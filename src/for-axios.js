import axios from 'axios';
const API_KEY = '29338502-d9e7525ed9dc6a9ae74eb85c1';
const BASE_URL = 'https://pixabay.com/api/';

async function forAxios(query, page){
        const params = new URLSearchParams({
            key: API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            q: query,
            page,
            per_page:40,

        }).toString()
   
    //замість феча(не треба переобр в джиес об'ект на відміну від фетча)
    //const axios = require('axios').default;
    return await axios.get(`${BASE_URL}?${params}`);
    }

export { forAxios }
        