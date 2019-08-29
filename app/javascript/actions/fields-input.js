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

  let titleFrame = document.querySelector('.info-track');
  let distanceField = document.querySelector('#activity-distance');
  let isChecked = distanceField.checked;
  const distanceInput = document.querySelector('.legend-infos-dist')

     if (isChecked) {
        if(distanceInput) {
          distanceInput.remove();

        }
      titleFrame.innerHTML = titleFrame.innerHTML + `<p class="legend-infos-dist"> <i class="fas fa-road"></i> ${Math.round(document.dist/1000)} kms</p>`;
     } else {
        if (distanceInput != null)
          distanceInput.remove();
     }
  };

const checkSpeed = () => {

  let titleFrame = document.querySelector('.info-track');
  let speedField = document.querySelector('#activity-speed');
  let isChecked = speedField.checked;

     if (isChecked) {
      titleFrame.innerHTML = titleFrame.innerHTML +`<p class="legend-infos-speed"> <i class="fas fa-tachometer-alt"></i> ${Math.round(document.speed*3.6)} km/h</p>`;
     } else{
        let speedInfo = document.querySelector('.legend-infos-speed');
        speedInfo.remove();

     }
  };
const checkTime = () => {

  let titleFrame = document.querySelector('.info-track');
  let timeField = document.querySelector('#activity-time');
  let isChecked = timeField.checked;

     if (isChecked) {
      titleFrame.innerHTML = titleFrame.innerHTML + `<p class="legend-infos-time"> <i class="fas fa-stopwatch"></i> ${Math.round(document.time/60)} Hrs</p>`;
     } else{
        let timeInfo = document.querySelector('.legend-infos-time');
        timeInfo.remove();

     }
  };

const checkElevation = () => {

  let titleFrame = document.querySelector('.info-track');
  let elevationField = document.querySelector('#activity-elevation');
  let isChecked = elevationField.checked;

     if (isChecked) {
      titleFrame.innerHTML = titleFrame.innerHTML + `<p class="legend-infos-elevation"><i class="fas fa-mountain"></i> ${document.elev} m</p>`;
     } else{
        let elevationInfo = document.querySelector('.legend-infos-elevation');
        elevationInfo.remove();

     }
  };


export {addFields};
export {checkDistance};
