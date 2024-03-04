'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImgs } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import Error from './img/octagon.svg';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.querySelector('.form');
const gallery = document.querySelector('.list');
const loader = document.querySelector('.loader');

form.addEventListener('submit', checkForSending);
loader.style.display = 'none';

function checkForSending(event) {
  event.preventDefault();

  const searchQuery = form.elements.query.value.trim();

  if (searchQuery === '') {
    iziToast.warning({
      message: 'Please enter a search query.',
      messageColor: 'black',
      backgroundColor: '#ffac26',
      position: 'topRight',
      pauseOnHover: false,
      progressBarColor: 'black',
      timeout: 3000,
    });

    return;
  }

  loader.style.display = 'block';

  fetchImgs(searchQuery)
    .then(data => {
      if (data && data.hits && data.hits.length > 0) {
        return data;
      }
    })
    .then(data => {
      renderGallery(data);
      lightbox.refresh();
    })
    .catch(error =>
      iziToast.error({
        theme: 'dark',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: Error,
        pauseOnHover: false,
        progressBarColor: '#b51b1b',
        timeout: 3000,
      })
    )
    .finally(() => {
      loader.style.display = 'none';
      form.reset();
    });
}
