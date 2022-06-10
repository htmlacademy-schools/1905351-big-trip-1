import dayjs from 'dayjs';
import { destinations } from './destinations';
import { eventTypes } from './event-types';

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (items) => {
  const id = getRandomInteger(0, items.length - 1);
  const element = items[id];
  return {id, element};
};

const getType = () => getRandomElement(eventTypes());

const getDestination = () => getRandomElement(destinations());

const getPrice = () => getRandomInteger(10, 100) * 10;

const getDates = (lastPointTime) => {
  let beginDate = lastPointTime?.endDate || dayjs().minute(0);
  const getBeginDateMinutes = () => getRandomInteger(12, 2000) * 10;
  const getMinutesGap = () => getRandomInteger(6, 36) * 10;

  beginDate = beginDate.add(getBeginDateMinutes(), 'm');
  const endDate = beginDate.add(getMinutesGap(), 'm').toDate();
  beginDate = beginDate.toDate();

  return {
    beginDate,
    endDate
  };
};

const getDuration = (start, end) => {
  const interval = new Date(end - start);

  return {
    days: interval.getUTCDate() - 1,
    hours: interval.getUTCHours(),
    minutes: interval.getUTCMinutes(),
  };
};

const getPictures = () => {
  const picturesCount = getRandomInteger(1, 10);
  const pictures = [];
  for (let i = 0; i < picturesCount; i++) {
    pictures.push({
      src: `https://picsum.photos/248/152?r=${Math.random()}`,
      description: `Picture ${i}`
    });
  }
  return pictures;
};

const getOffers = () => {
  const offers = [
    'Add luggage',
    'Switch to comfort',
    'Add meal',
    'Choose seats',
    'Travel by train',
    'Switch to business class',
    'Rent a car',
    'Add breakfast',
    'Branch in city',
  ];
  const res = [];
  const titles = offers;
  for (let j = 0; j < getRandomInteger(0, 5); j++) {
    const nextTitleItem = getRandomElement(titles);
    res.push({
      id: j + 1,
      title: nextTitleItem.element,
      price: getRandomInteger(2, 30) * 10,
      isActive: Boolean(getRandomInteger(0,1)),
      type: getType().element
    });
    titles.splice(nextTitleItem.id, 1);
  }

  return res.sort((a, b) => b.isActive - a.isActive);
};

const getDescription = () => {
  const sentences = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'
  ];
  const sentencesSet = sentences;
  const sentencesCount = getRandomInteger(1, 5);
  const description = [];

  for (let i = 0; i < sentencesCount; i++) {
    const nextElement = getRandomElement(sentences);
    description.push(nextElement.element);
    sentencesSet.splice(nextElement.id, 1);
  }

  return description.join(' ');
};

const generateDestination = () => ({
  description: getDescription(),
  name: getDestination().element,
  pictures: getPictures()
});

export const generatePoint = () => {
  const dates = getDates();
  return {
    'basePrice': getPrice(),
    'dateFrom': dates.beginDate,
    'dateTo': dates.endDate,
    'tripDuration': getDuration(dates.beginDate, dates.endDate),
    'destination': generateDestination(),
    'id': getRandomInteger(1, 100),
    'isFavorite': Boolean(getRandomInteger(0, 1)),
    'offers': getOffers(),
    'type': getType().element,
  };
};

