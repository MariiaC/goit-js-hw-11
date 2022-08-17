import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import {forAxios} from './for-axios.js';

//refs
const refs = {
  searchForm: document.querySelector('#search-form'),
  input: document.querySelector('.input'),
  searchBtn: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
};
// console.log(refs);

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    clearData();
    // console.log(event);
    const query = event.currentTarget.elements.searchQuery.value.trim().toLowerCase();; //лінк на форму  
       if (!query) {  //якщо запит - це пуста строка
        return
    }
    //отримуємо інфо після рендерингу //отримання  - через фу-ціюна іншій вкладці. Тут вже умови прописуємо
   forAxios(query) 
        .then(data => {
            if (!data.hits.length) {
                Notiflix.Notify.failure('No matches found. Please try again');
                return;
            }
            Notiflix.Notify.info('Success! ${data.totalHits}');
            renderData(data.hits);
        })
        .catch( error => {
            Notiflix.Notify.failure('Oops, smth went wrong');
        })
};
//рендерих отриманих даних
function renderData(data) {
    const markup = data.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }) => {
        return `<div class="photo-card"> ${webformatURL}
  <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
    })
        .join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup)
}


function clearData() {
 refs.gallery.innerHTML = '';
}
