export function fetchImgs(query) {
  // Определяем константы для параметров API Pixabay
  const refs = {
    KEYWORD: 'nature', // Ключевое слово по умолчанию
    IMAGE_TYPE: 'photo', // Тип изображения
    SAFESEARCH: 'true', // Фильтр безопасного поиска
    ORIENTATION: 'horizontal', // Ориентация изображения
    API_KEY: '42695738-6b8e09c0e47bd53fa68e0735a', // Ключ API
    URL: 'https://pixabay.com/api/', // URL API
  };

  // Составляем URL с запросом и параметрами API
  const linkWithQuery = `${refs.URL}?key=${refs.API_KEY}&q=${query}&image_type=${refs.IMAGE_TYPE}&safesearch=${refs.SAFESEARCH}&orientation=${refs.ORIENTATION}`;

  // Получаем данные из API Pixabay
  return fetch(linkWithQuery)
    .then(response => {
      // Проверяем успешность ответа
      if (!response.ok) {
        throw new Error(response.status); // Бросаем ошибку, если ответ не успешный
      }
      return response.json(); // Преобразуем ответ в формат JSON
    })
    .then(data => {
      // Проверяем наличие массива с изображениями (hits)
      if (data && data.hits) {
        return data; // Возвращаем данные, если изображения найдены
      }
    });
}
