import AbstractClassView from '../view/abstract-class';

export const importPositions = {
  beforeBegin: 'beforebegin',
  beforeEnd: 'beforeend',
  afterBegin: 'afterbegin',
  afterEnd: 'afterend'
};

export const renderItem = (container, component, place) => {
  const parent = container instanceof AbstractClassView ? container.element : container;
  const child = component instanceof AbstractClassView ? component.element : component;

  switch (place) {
    case importPositions.beforeBegin:
      parent.before(child);
      break;
    case importPositions.beforeEnd:
      parent.append(child);
      break;
    case importPositions.afterBegin:
      parent.prepend(child);
      break;
    case importPositions.afterEnd:
      parent.after(child);
      break;
  }
};

export const createHTMLElement = (template) => {
  const newItem = document.createElement('div');
  newItem.innerHTML = template;

  return newItem.firstChild;
};
