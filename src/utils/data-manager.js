import {descriptionSentences, destinations, eventTypes, filterType, offerTitles} from './constants';
import {getRandomElement, getRandomInteger} from './tools';
import dayjs from 'dayjs';

export const generateOffers = (isEmptyPoint = false) => {
  const result = {};

  for (const type of eventTypes()) {
    const offers = [];
    const titles = offerTitles();

    for (let j = 0; j < getRandomInteger(0, 5); j++) {
      const nextTitle = getRandomElement(titles).element;
      offers.push({
        id: j + 1,
        title: nextTitle,
        price: getRandomInteger(2, 30) * 10,
        isActive: isEmptyPoint ? false : Boolean(getRandomInteger(0, 1))
      });
      titles.splice(titles.indexOf(nextTitle), 1);
    }

    result[type] = offers;
  }

  return result;
};

export const getPictures = () => {
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

export const getDescription = () => {
  const sentences = descriptionSentences();
  const sentencesCount = getRandomInteger(1, 5);
  const description = [];

  for (let i = 0; i < sentencesCount; i++) {
    const nextElement = getRandomElement(sentences);
    description.push(nextElement.element);
    sentences.splice(nextElement.id, 1);
  }

  return description.join(' ');
};

export const getDuration = (start, end) => {
  const interval = new Date(end - start);

  return {
    days: interval.getUTCDate() - 1,
    hours: interval.getUTCHours(),
    minutes: interval.getUTCMinutes(),
  };
};

export const generateDates = (lastPointTime) => {
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

export const generateDestination = () => {
  const availableDestinations = destinations();
  const resDestinations = [];

  availableDestinations.forEach((item) => {
    resDestinations.push({
      description: getDescription(),
      name: item,
      pictures: getPictures()
    });
  });

  return resDestinations;
};

export const getTotalPrice = (point) => {
  let res = point.basePrice;
  res += point.offers[point.type].reduce(
    (accum, offer) => offer.isActive ? accum + offer.price : accum, 0);

  return res;
};

export const filter = {
  [filterType.everything]: (points) => points.filter((point) => point),
  [filterType.future]: (points) => points.filter((point) => new Date(point.dateFrom) > new Date()),
  [filterType.past]: (points) => points.filter((point) => new Date(point.dateTo) < new Date()),
};

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);

export const getRandomDestination = () => getRandomElement(generateDestination()).element;

export const getType = () => getRandomElement(eventTypes()).element;
