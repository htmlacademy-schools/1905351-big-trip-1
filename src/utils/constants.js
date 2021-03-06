export const eventTypes = () => (
  [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant'
  ]
);

export const destinations = () => ([
  'Geneva',
  'Amsterdam',
  'Moscow',
  'Yekaterinburg',
  'Saint Petersburg',
  'Ufa',
  'Kazan',
  'Chelyabinsk',
  'Samara',
  'Phnom Penh',
  'Omsk',
  'Cappadocia',
  'Rome',
  'Toronto',
]);

export const offerTitles = () => ([
  'Add luggage',
  'Order Uber',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city'
]);

export const descriptionSentences = () => ([
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
]);

export const sortBy = {
  day: 'datetime',
  duration: 'duration',
  price: 'price',
};

export const userAction = {
  updatePoint: 'update',
  addPoint: 'add',
  removePoint: 'remove',
};

export const updateType = {
  patch: 'patch',
  minor: 'minor',
  major: 'major',
};

export const filterType = {
  everything: 'everything',
  future: 'future',
  past: 'past'
};
