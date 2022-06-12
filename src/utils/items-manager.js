import { sortBy } from './constants';
import {getTotalPrice} from './data-manager';

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
      return (a, b) => getTotalPrice(a) - getTotalPrice(b);
  }
};

