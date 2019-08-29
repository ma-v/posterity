import {selectRide} from './init-map';
import {initMap} from './init-map';

const addFields = () => {
  let titleFrame = document.querySelector('.map-title');
  let distanceField = document.querySelector('#activity-distance');
  distanceField.addEventListener('change', checkDistance);
};

const checkDistance = () => {

  let titleFrame = document.querySelector('.map-title');
  let distanceField = document.querySelector('#activity-distance');
  let isChecked = distanceField.checked;

     if (isChecked) {
      titleFrame.insertAdjacentHTML("beforeend",`<p class="legend-infos">${document.dist/1000} kms</p>`);
     } else{
        let distanceInfo = document.querySelector('.legend-infos');
        distanceInfo.remove();

     }
  };


export {addFields};
export {checkDistance};
