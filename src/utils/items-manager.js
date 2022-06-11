import { sortBy } from './constants';

export const updateItems = (items, toUpdate) => {
  const index = items.findIndex((item) => item.id === toUpdate.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    toUpdate,
    ...items.slice(index + 1),
  ];
};

const durationSort = (a, b) => {
  const getMinutes = (tripDuration) => tripDuration.days * 24 * 60 + tripDuration.hours * 60 + tripDuration.minutes;

  const firstDuration = getMinutes(a.tripDuration);
  const secondDuration = getMinutes(b.tripDuration);
  return firstDuration - secondDuration;
};

export const sortItemsBy = (sortType) => {
  switch (sortType) {
    case sortBy.day:
      return (a,b) => a.dateFrom - b.dateFrom;
    case sortBy.duration:
      return durationSort;
    case sortBy.price:
      return (a, b) => a.basePrice - b.basePrice;
    default:
      return 0;
  }
};

