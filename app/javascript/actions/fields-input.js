import {selectRide} from './init-map';
import {initMap} from './init-map';

const addFields = () => {
  let titleFrame = document.querySelector('.map-title');
  let distanceField = document.querySelector('#activity-distance');
  let speedField = document.querySelector('#activity-speed');
  let timeField = document.querySelector('#activity-time');
  let elevationField = document.querySelector('#activity-elevation');
  distanceField.addEventListener('change', checkDistance);
  speedField.addEventListener('change', checkSpeed);
  timeField.addEventListener('change', checkTime);
  elevationField.addEventListener('change', checkElevation);
};

const checkDistance = () => {

  let titleFrame = document.querySelector('.map-title');
  let distanceField = document.querySelector('#activity-distance');
  let isChecked = distanceField.checked;
  const distanceInput = document.querySelector('.legend-infos-dist')

     if (isChecked) {
        if(distanceInput) {
          distanceInput.remove();
        }
      titleFrame.insertAdjacentHTML("beforeend",`<p class="legend-infos-dist">${document.dist/1000} kms</p>`);
     } else {
        if (distanceInput != null)
          distanceInput.remove();
     }
  };

const checkSpeed = () => {

  let titleFrame = document.querySelector('.map-title');
  let speedField = document.querySelector('#activity-speed');
  let isChecked = speedField.checked;

     if (isChecked) {
      titleFrame.insertAdjacentHTML("beforeend",`<p class="legend-infos-speed">average speed:${Math.round(document.speed*3.6)} km/h</p>`);
     } else{
        let speedInfo = document.querySelector('.legend-infos-speed');
        speedInfo.remove();

     }
  };
const checkTime = () => {

  let titleFrame = document.querySelector('.map-title');
  let timeField = document.querySelector('#activity-time');
  let isChecked = timeField.checked;

     if (isChecked) {
      titleFrame.insertAdjacentHTML("beforeend",`<p class="legend-infos-time">Time:${Math.round((document.time/60)/60)}Hrs</p>`);
     } else{
        let timeInfo = document.querySelector('.legend-infos-time');
        timeInfo.remove();

     }
  };

const checkElevation = () => {

  let titleFrame = document.querySelector('.map-title');
  let elevationInfo = document.querySelector('.legend-infos-elevation');
  let elevationField = document.querySelector('#activity-elevation');
  let isChecked = elevationField.checked;

     if (isChecked) {
      if(elevationInfo) {
          elevationInfo.remove();
        }
      titleFrame.insertAdjacentHTML("beforeend",`<p class="legend-infos-elevation">Elevation:${Math.round(document.elev)}meters</p>`);
     } else{
        let elevationInfo = document.querySelector('.legend-infos-elevation');
        if (elevationInfo != null)
         elevationInfo.remove();


     }
  };


export {addFields};
export {checkDistance};
export {checkElevation};
