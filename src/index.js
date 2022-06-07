import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkupList } from './js/createMarkuplist';
import { createMarkupCard } from './js/createCountryInfo';
import {fetchCountries} from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch({ target: { value } }) {
  const inputTrim = value.trim();
  clearMarkup();

  if (!inputTrim) {
    return;
  }

    fetchCountries(inputTrim)
        .then(getResponse)
        .then(renderCountries)
        .catch(getError);
}

function renderCountries(countries) {
    clearMarkup();
  
    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length > 1) {
      countryList.innerHTML = createMarkupList(countries);
      renderedList(countries);
    } else {
      countryInfo.innerHTML = createMarkupCard(countries);
    }
  }

function clearMarkup() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function getResponse(response) {
    if (!response.ok) {
        throw new Error('Error');
    }
    return response.json();
}

function getError(error) {
    Notify.failure('Oops, there is no country with that name');
  }
  

function renderedList (countries) {
    const items = document.querySelectorAll('.country-list__item');
    items.forEach(item => item.addEventListener('click', onItem));
  
    function onItem(e) {
      const { currentTarget } = e;
  
      const filtered = countries.filter(
        country => country.name.official === currentTarget.dataset.item
      );
  
      renderCountries(filtered);
  
      items.forEach(item => item.removeEventListener('click', onItem));
    }
  }