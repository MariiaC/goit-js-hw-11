import './css/styles.css';
import Notiflix from 'notiflix';
// import axios from 'axios';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import { forAxios } from './for-axios.js';


//refs
const refs = {
  searchForm: document.querySelector('#search-form'),
  input: document.querySelector('.input'),
  searchBtn: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  msg:document.querySelector('.msg'),
};
// console.log(refs);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoad)
let currentPage = 1;
let searchQuery;//вивели в глобальну змінну, щоб можна було потім опрокидувати на 

function onLoad() {
  forAxios(searchQuery, currentPage += 1)
    .then(data => {
      renderData(data.data.hits)//це вже інша змінна ніж на 48-різні обл видимості

    if (Math.ceil(data.data.totalHits < currentPage * 40)) {
      Notiflix.Notify.warning('We are sorry, but you have reached the end of search results.');
      refs.loadMoreBtn.style.visibility = 'hidden';
      refs.msg.style.visibility = 'visible';
    }
    }     
  )
}
  
const lightbox = new SimpleLightbox('.gallery a'); 

function onSearch(event) {
  event.preventDefault();
  clearData();
    // console.log(event);
    const query = event.currentTarget.elements.searchQuery.value.trim().toLowerCase();; //лінк на форму  
       if (!query) {  //якщо запит - це пуста строка
        return
       }
  searchQuery = query;
    //отримуємо інфо після рендерингу //отримання  - через фу-ціюна іншій вкладці. Тут вже умови прописуємо
  
   forAxios(query,currentPage) 
     .then(data => {
       const hits = data.data.hits;//коли видаає результат можна подив через нетворк, що хітс знаходяться в дата, яка в дата))
          //console.log(data);
       
          if (!hits.length) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                return;
            }
            Notiflix.Notify.info(`Hooray! We found ${data.data.totalHits} images. `);
            renderData(hits);
       refs.loadMoreBtn.style.visibility = 'visible';    
       
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
  
};

function clearData() {
  refs.gallery.innerHTML = '';
  currentPage = 1;
  refs.msg.style.visibility = 'hidden';
   refs.loadMoreBtn.style.visibility = 'hidden';
};

  