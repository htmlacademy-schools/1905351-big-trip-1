import { generatePoint } from './mock/event-point';
import TripPresenter from './presenter/trip-presenter';
import { PointsModel } from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const TRIP_POINTS_COUNT = 20;
const points =
  Array.from({length: TRIP_POINTS_COUNT}, generatePoint)
    .sort((a, b) => a.dateFrom - b.dateFrom);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

pointsModel.points = points;

const pageBody = document.querySelector('.page-body');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter(pageBody, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersElement, filterModel);

filterPresenter.init();
tripPresenter.init();
