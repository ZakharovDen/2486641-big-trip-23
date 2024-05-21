import AbstractView from '../framework/view/abstract-view.js';

const createSortTemplate = (sortItems) => {
  let sortElements = '';
  Object.entries(sortItems).forEach(([key, value]) => {
    sortElements += `<div class="trip-sort__item  trip-sort__item--${key}">
        <input id="sort-${key}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${key}" data-sort-type="${key}" ${value.available ? '' : 'disabled'}>
        <label class="trip-sort__btn" for="sort-${key}">${value.label}</label>
      </div>`;
  });

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortElements}
    </form>`
  );
};

export default class SortView extends AbstractView {
  #sortItems = null;
  #handleSortTypeChange = null;
  constructor ({sortItems, onSortTypeChange}) {
    super();
    this.#sortItems = sortItems;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT' || !this.#sortItems[evt.target.dataset.sortType].available) {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortTemplate(this.#sortItems);
  }

}
