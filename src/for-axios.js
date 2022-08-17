const API_KEY = '29338502-d9e7525ed9dc6a9ae74eb85c1';
const BASE_URL = 'https://pixabay.com/api/';

function forAxios(query){
        const params = new URLSearchParams({
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        })
   
    //замість феча(не треба переобр в джиес об'ект на відміну від фетча)
    const axios = require('axios').default;
    axios
        .get(`${BASE_URL}?${params}`)
        .then(response => {
           return console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
  // fetch(`${BASE_URL}?${params}`)
    // .then(response => response.json())
    //     .then(console.log)
    //     .catch((error) => {
    //     console.error(error));
    }

        export {forAxios}