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

export const sortBy = {
  day: 'datetime',
  duration: 'duration',
  price: 'price',
};
