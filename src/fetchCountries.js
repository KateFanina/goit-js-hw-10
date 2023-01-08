const BASE_URL = 'https://restcountries.com/v3.1';
const STRING_FIELDS = 'name,capital,population,flags,languages';

const ERROR_STATUS = 404;

export function fetchCountries(name) {
  const url = `${BASE_URL}/name/${name}?fields=${STRING_FIELDS}`;

  return fetch(url)
    .then(response => {
      if (response.status === ERROR_STATUS) {
        return Promise.reject();
      }
      return response.json();
    })
    .catch(() => Promise.reject());
}
