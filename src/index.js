import './css/styles.css';
import Notiflix from 'notiflix';
// import axios from 'axios';
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

let currentPage;

function onSearch(event) {
    event.preventDefault();
    clearData();
    // console.log(event);
    const query = event.currentTarget.elements.searchQuery.value.trim().toLowerCase();; //лінк на форму  
       if (!query) {  //якщо запит - це пуста строка
        return
    }
    //отримуємо інфо після рендерингу //отримання  - через фу-ціюна іншій вкладці. Тут вже умови прописуємо
  
   forAxios(query,currentPage) 
     .then(data => {
       const hits = data.data.hits;
          console.log(data);
            if (!hits.length) {
                Notiflix.Notify.failure('No matches found. Please try again');
          
                return;
            }
            Notiflix.Notify.info(`Success! ${data.data.totalHits}`);
            renderData(hits);
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
        return `<a href="${largeImageURL}"> <div class="photo-card"> 
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
</div> </a>`;
    })
        .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
   lightbox.refresh()
}

function clearData() {
  refs.gallery.innerHTML = '';
  currentPage = 1;
}

const lightbox = new SimpleLightbox('.gallery a'); 
