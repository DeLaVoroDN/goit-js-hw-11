export function fetchImgs(query) {
  const refs = {
    KEYWORD: 'nature',
    IMAGE_TYPE: 'photo',
    SAFESEARCH: 'true',
    ORIENTATION: 'horizontal',
    API_KEY: '42695738-6b8e09c0e47bd53fa68e0735a',
    URL: 'https://pixabay.com/api/',
  };

  const linkWithQuery = `${refs.URL}?key=${refs.API_KEY}&q=${query}&image_type=${refs.IMAGE_TYPE}&safesearch=${refs.SAFESEARCH}&orientation=${refs.ORIENTATION}`;

  return fetch(linkWithQuery)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.hits) {
        return data;
      }
    });
}
