export function createMarkupList(countries) {
    return countries
      .map(
        ({ name: { official }, flags: { svg } }) =>
          `<li class="country-list__item" data-item="${official}">
            <img src="${svg}" class="country-image" alt="${official}" width=30 >
            <p class="country-name">${official}</p>
          </li>`
      )
      .join('');
}
