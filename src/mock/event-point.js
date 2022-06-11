import { nanoid } from 'nanoid';
import { getRandomInteger } from '../utils/tools';
import {
  generateDates,
  generateOffers,
  getDuration, getRandomDestination,
  getType
} from '../utils/data-manager';

const getPrice = () => getRandomInteger(10, 100) * 10;

export const generatePoint = () => {
  const { beginDate, endDate } = generateDates();

  return {
    'basePrice': getPrice(),
    'dateFrom': beginDate,
    'dateTo': endDate,
    'tripDuration': getDuration(beginDate, endDate),
    'destination': getRandomDestination(),
    'isFavorite': Boolean(getRandomInteger(0, 1)),
    'offers': generateOffers(),
    'type': getType(),
    'id': nanoid(),
  };
};

