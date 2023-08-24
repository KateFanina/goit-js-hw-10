import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'debounce';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function addCountryNodes(countries) {
  const markup = countries
    .map(
      country =>
        `<div style="list-style: none">
          <img alt=${country.altSpellings} src=${country.flags.svg} width="30" />
          ${country?.name?.official}
        </div>`
    )
    .join('');
  countryList.innerHTML = markup;
}

function addCountryInfo(country) {
  const markup = `
  <div style = "display: flex">
    <h2 class="country-details">
        Capital: &nbsp
    </h2>
    <span class="country-information">${country.capital}</span>
  </div>
  <div style = "display: flex">
    <h2 class="country-details">
      Population: &nbsp 
    </h2>
    <span class="country-information">${new Intl.NumberFormat('ua-UA').format(country.population)}</span>
  </div>
  <div style = "display: flex">
    <h2 class="country-details">
      Languages: &nbsp
    </h2>
    <span class="country-information">
      ${Object.values(country.languages).join(', ')}
    </span>
  </div>`;
  countryInfo.innerHTML = markup;
}

const clearData = () => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};

function onSearch(event) {
  event.preventDefault();
  let countries = [];
  const searchValue = event.target.value.trim();
  if (searchValue.length) {
    fetchCountries(searchBox.value)
      .then(countries => {
        if (countries?.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          clearData();
          return;
        }
        addCountryNodes(countries);
        if (countries.length === 1) {
          addCountryInfo(countries[0]);
        } else {
          countryInfo.innerHTML = '';
        }
      })
      .catch(() => {
        Notify.failure('Oops, there is no country with that name');
        clearData();
      });
  } else {
    clearData();
  }
}

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
