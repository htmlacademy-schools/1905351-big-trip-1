export const importPositions = {
  beforeBegin: 'beforebegin',
  beforeEnd: 'beforeend',
  afterBegin: 'afterbegin',
  afterEnd: 'afterend'
};

export const renderItem = (container, item, importPlace) => {
  container.insertAdjacentHTML(importPlace, item);
};
