export const importPositions = {
  beforeBegin: 'beforebegin',
  beforeEnd: 'beforeend',
  afterBegin: 'afterbegin',
  afterEnd: 'afterend'
};

export const renderItem = (container, item, place) => {
  switch (place) {
    case importPositions.beforeBegin:
      container.before(item);
      break;
    case importPositions.beforeEnd:
      container.append(item);
      break;
    case importPositions.afterBegin:
      container.prepend(item);
      break;
    case importPositions.afterEnd:
      container.after(item);
      break;
  }
};

export const createHTMLElement = (template) => {
  const newItem = document.createElement('div');
  newItem.innerHTML = template;

  return newItem.firstChild;
};
