import {menuTemplate} from './view/menu';
import {filterTemplate} from './view/filter';
import {sortTemplate} from './view/sort';
import {formCreationTemplate} from './view/form-creation';
import {formEditTemplate} from './view/form-edit';
import {listedTravelTemplate} from './view/listed-travel';
import {renderItem, importPositions} from './rendering';


const eventsContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.page-header');
const bodyContainer = document
  .querySelector('.page-main')
  .querySelector('.page-body__container');
const headerNavigationContainer = headerContainer.querySelector('.trip-controls__navigation');
const headerFiltersContainer = headerContainer.querySelector('.trip-controls__filters');

renderItem(eventsContainer, formEditTemplate(), importPositions.beforeEnd);
renderItem(eventsContainer, formCreationTemplate(), importPositions.beforeEnd);
renderItem(headerNavigationContainer, menuTemplate(), importPositions.beforeEnd);
renderItem(headerFiltersContainer, filterTemplate(), importPositions.beforeEnd);
renderItem(bodyContainer, sortTemplate(), importPositions.beforeEnd);

for (let i = 0; i < 3; i++) {
  renderItem(bodyContainer, listedTravelTemplate(), importPositions.beforeEnd);
}

