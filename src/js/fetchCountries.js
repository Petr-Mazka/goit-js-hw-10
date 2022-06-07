const API_LINK = 'https://restcountries.com/v3.1/name/';

const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

export function fetchCountries(name) {
  return fetch(`${API_LINK}${name}?${searchParams}`);
}