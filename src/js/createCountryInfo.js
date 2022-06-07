export function createMarkupCard(countries) {
    return countries
      .map(country => {
        const {
          name: { official },
          capital,
          population,
          flags: { svg },
          languages,
        } = country;
        const langString = Object.values(languages).join(',');
  
        return `<div class="country-title"><img src="${svg}" alt="${official}" width=50>
        <p class="country-name-off">${official}</p></div>
          <ul class="country-info__list">
            <li class="country-item"><span class="country-span">Capital:</span>${capital}</li>
            <li class="country-item"><span class="country-span">Population:</span>${population}</li>
            <li class="country-item"><span class="country-span">Languages:</span>${langString}</li>
          </ul>`;
      })
      .join('');
  }