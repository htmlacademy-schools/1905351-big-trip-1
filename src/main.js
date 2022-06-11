import { generatePoint } from './mock/event-point';
import TripPresenter from './presenter/trip-presenter';

const TRIP_POINTS_COUNT = 20;
const points =
  Array.from({length: TRIP_POINTS_COUNT}, generatePoint)
    .sort((a, b) => a.dateFrom - b.dateFrom);

const pageBody = document.querySelector('.page-body');

const tripPresenter = new TripPresenter(pageBody);
tripPresenter.init(points);
