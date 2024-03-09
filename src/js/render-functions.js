export function renderGallery(data) {
  // Находим элемент галереи
  const gallery = document.querySelector('.list');

  // Проверяем, существует ли элемент галереи
  if (!gallery) {
    console.error('Gallery element not found'); // Выводим сообщение об ошибке в консоль
    return; // Завершаем выполнение функции
  }

  // Получаем первые 9 изображений из данных
  const imgs = data.hits.slice(0, 9);

  // Заполняем содержимое галереи
  gallery.innerHTML = imgs
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        // Создаем HTML-разметку для каждого изображения
        return `
        <li class="gallery-item">
          <div class="gallery-box item-card-wrapper">
            <a class="gallery-link" href="${largeImageURL}">
              <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy">
            </a>
            <div class="card-box">
              <div>
                <p class="card-box-text"><b>Likes</b></p>
                <p class="card-box-text">${likes}</p>
              </div>
              <div>
                <p class="card-box-text"><b>Views</b></p>
                <p class="card-box-text">${views}</p>
              </div>
              <div>
                <p class="card-box-text"><b>Comments</b></p>
                <p class="card-box-text">${comments}</p>
              </div>
              <div>
                <p class="card-box-text"><b>Downloads</b></p>
                <p class="card-box-text">${downloads}</p>
              </div>
            </div>
          </div>
        </li>`;
      }
    )
    .join(''); // Объединяем массив HTML-строк в одну строку
}
