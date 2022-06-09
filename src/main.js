import { menuTemplate } from './view/menu';
import { travelInfoTemplate } from './view/route-info';
import { filterTemplate } from './view/filter';
import { sortTemplate } from './view/sort';
import { formCreationTemplate } from './view/form-creation';
import { formEditTemplate } from './view/form-edit';
import { travelListTemplate } from './view/travel-list';
import { listedTravelTemplate } from './view/listed-travel';
import { renderItem, importPositions } from './rendering';
import { generatePoint } from './mock/event-point';

const TRIP_POINTS_COUNT = 20;
const trips = Array.from({length: TRIP_POINTS_COUNT}, generatePoint).sort((a, b) => a.dateFrom - b.dateFrom);

const eventsContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.page-header');
const infoTripContainer = headerContainer.querySelector('.trip-main');
const headerNavigationContainer = headerContainer.querySelector('.trip-controls__navigation');
const headerFiltersContainer = headerContainer.querySelector('.trip-controls__filters');

renderItem(eventsContainer, travelListTemplate(), importPositions.beforeEnd);

const tripEventsListContainer = eventsContainer.querySelector('.trip-events__list');

renderItem(infoTripContainer, travelInfoTemplate(trips.slice(1, TRIP_POINTS_COUNT)), importPositions.afterBegin);
renderItem(eventsContainer, sortTemplate(), importPositions.afterBegin);
renderItem(headerFiltersContainer, filterTemplate(), importPositions.beforeEnd);
renderItem(tripEventsListContainer, formEditTemplate(trips[1]), importPositions.afterBegin);
renderItem(tripEventsListContainer, formCreationTemplate(trips[0]), importPositions.afterBegin);
renderItem(headerNavigationContainer, menuTemplate(), importPositions.beforeEnd);

for (let i = 2; i < TRIP_POINTS_COUNT; i++) {
  renderItem(tripEventsListContainer, listedTravelTemplate(trips[i]), importPositions.beforeEnd);
}
