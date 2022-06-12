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

export const replace = (replacer, itemToReplace) => {
  if (itemToReplace === null || replacer === null) {
    throw new Error('Replace element(s) are not defined');
  }

  const newChild = replacer instanceof AbstractClassView ? replacer.element : replacer;
  const oldChild = itemToReplace instanceof AbstractClassView ? itemToReplace.element : itemToReplace;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('There is no parent element');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractClassView)) {
    throw new Error('This item is not removable');
  }


  component.element.remove();
  component.removeElement();
};
