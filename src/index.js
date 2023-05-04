import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImagesByQuery } from './js/PixabayAPI';
import { createMarkup } from './js/createGalleryCard';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let searchQuery = '';

loadMoreButton.addEventListener('click', onPagination);

async function onPagination() {
  currentPage += 1;

  try {
    const {hits, totalHits} = await getImagesByQuery(searchQuery, currentPage);
    galleryList.insertAdjacentHTML('beforeend', createMarkup(hits));
    if(gallery.children.length >= totalHits){
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results")
      loadMoreButton.hidden = true;
    };
  } catch (error) {
    console.log(error)
  }
}

searchForm.addEventListener('submit', onSubmitForm);

async function onSubmitForm(evt) {
    evt.preventDefault()
    const formData = new FormData(evt.currentTarget);
    searchQuery = formData.get('searchQuery');
    if (searchQuery === '') {
        galleryList.innerHTML = '';
    }
    currentPage = 1;
    
    try {
        const {hits, totalHits} = await getImagesByQuery(searchQuery);
    galleryList.innerHTML = createMarkup(hits);
      
      if (totalHits <= 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        loadMoreButton.hidden = true;
      } else if(totalHits < 40){
        loadMoreButton.hidden = true;
      } else 
      loadMoreButton.hidden = false;
  } catch (error) {
    console.log(error)
  } finally {
    evt.currentTarget.reset()};
  reset();
}
