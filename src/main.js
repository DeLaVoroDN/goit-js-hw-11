'use strict';

// Импортируем необходимые модули и стили
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImgs } from './js/pixabay-api.js'; // Импортируем функцию для получения изображений из Pixabay API
import { renderGallery } from './js/render-functions.js'; // Импортируем функцию для отображения галереи изображений
import Error from './img/octagon.svg'; // Импортируем иконку для отображения ошибки

// Создаем экземпляр SimpleLightbox для отображения изображений в галерее
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', // Используем атрибут alt для заголовков изображений в галерее
  captionDelay: 250, // Задержка перед отображением заголовка
});

// Получаем DOM-элементы формы, галереи и загрузчика
const form = document.querySelector('.form');
const gallery = document.querySelector('.list');
const loader = document.querySelector('.loader');

// Добавляем обработчик события отправки формы
form.addEventListener('submit', checkForSending);
loader.style.display = 'none'; // Скрываем загрузчик по умолчанию

// Функция для проверки и отправки запроса на получение изображений
function checkForSending(event) {
  event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

  const searchQuery = form.elements.query.value.trim(); // Получаем значение поискового запроса из формы и удаляем лишние пробелы

  // Если поисковый запрос пуст, отображаем предупреждение
  if (searchQuery === '') {
    iziToast.warning({
      message: 'Please enter a search query.', // Сообщение о необходимости ввести поисковый запрос
      messageColor: 'black', // Цвет текста сообщения
      backgroundColor: '#ffac26', // Фоновый цвет сообщения
      position: 'topRight', // Позиция сообщения
      pauseOnHover: false, // Пауза при наведении курсора
      progressBarColor: 'black', // Цвет прогресс-бара
      timeout: 3000, // Время, через которое сообщение исчезнет
    });

    return; // Завершаем выполнение функции
  }

  loader.style.display = 'block'; // Показываем загрузчик перед отправкой запроса

  // Отправляем запрос на получение изображений по заданному запросу
  fetchImgs(searchQuery)
    .then(data => {
      if (data && data.hits && data.hits.length > 0) {
        // Если получены изображения
        return data; // Возвращаем полученные данные
      }
    })
    .then(data => {
      renderGallery(data); // Отображаем галерею с полученными изображениями
      lightbox.refresh(); // Обновляем галерею в lightbox
    })
    .catch(error =>
      iziToast.error({
        theme: 'dark', // Темная тема сообщения об ошибке
        message:
          'Sorry, there are no images matching your search query. Please try again!', // Сообщение об ошибке
        messageColor: '#ffffff', // Цвет текста сообщения об ошибке
        backgroundColor: '#ef4040', // Фоновый цвет сообщения об ошибке
        position: 'topRight', // Позиция сообщения об ошибке
        iconUrl: Error, // Иконка ошибки
        pauseOnHover: false, // Пауза при наведении курсора
        progressBarColor: '#b51b1b', // Цвет прогресс-бара
        timeout: 3000, // Время, через которое сообщение исчезнет
      })
    )
    .finally(() => {
      loader.style.display = 'none'; // Скрываем загрузчик после выполнения запроса
      form.reset(); // Сбрасываем значения формы
    });
}
