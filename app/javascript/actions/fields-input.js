import {selectRide} from './init-map';
import {initMap} from './init-map';

const fieldsInputs = () => {
  let titleFrame = document.querySelector('.info-track');
  let distanceField = document.querySelector('#activity-distance');
  let speedField = document.querySelector('#activity-speed');
  let timeField = document.querySelector('#activity-time');
  let elevationField = document.querySelector('#activity-elevation');

  const addFields = () => {
    distanceField.addEventListener('change', checkDistance);
    speedField.addEventListener('change', checkSpeed);
    timeField.addEventListener('change', checkTime);
    elevationField.addEventListener('change', checkElevation);
  };

  const checkDistance = () => {
    let isChecked = distanceField.checked;
    const distanceInfo = document.querySelector('.legend-infos-dist');
    if (isChecked) {
      if(distanceInfo) {
        distanceInfo.remove();
      }
      titleFrame.innerHTML = titleFrame.innerHTML + `<p class="legend-infos-dist"> <i class="fas fa-road"></i> ${Math.round(document.dist/1000)} kms</p>`;
    } else {
      if (distanceInfo)
      distanceInfo.remove();
    }
  };

  const checkSpeed = () => {
    let isChecked = speedField.checked;
    const speedInfo = document.querySelector('.legend-infos-speed');

    if (isChecked) {
      if(speedInfo) {
        speedInfo.remove();
      }
      titleFrame.innerHTML = titleFrame.innerHTML +`<p class="legend-infos-speed"> <i class="fas fa-tachometer-alt"></i> ${Math.round(document.speed*3.6)} km/h</p>`;
    } else{
      let speedInfo = document.querySelector('.legend-infos-speed');
      if (speedInfo)
      speedInfo.remove();

    }
  };
  const checkTime = () => {
    let isChecked = timeField.checked;
    let timeInfo = document.querySelector('.legend-infos-time');

    if (isChecked) {
      if(timeInfo) {
        timeInfo.remove();
      }
      titleFrame.innerHTML = titleFrame.innerHTML + `<p class="legend-infos-time"> <i class="fas fa-stopwatch"></i> ${new Date(document.time * 1000).toISOString().substr(11, 8)}</p>`;
    } else{
      let timeInfo = document.querySelector('.legend-infos-time');
      if (timeInfo)
      timeInfo.remove();

    }
  };

  const checkElevation = () => {
    let elevationInfo = document.querySelector('.legend-infos-elevation');
    let isChecked = elevationField.checked;

    if (isChecked) {
      if(elevationInfo) {
        elevationInfo.remove();
      }
      titleFrame.innerHTML = titleFrame.innerHTML + `<p class="legend-infos-elevation"><i class="fas fa-mountain"></i> ${document.elev} m</p>`;
    } else{
      let elevationInfo = document.querySelector('.legend-infos-elevation');
      if (elevationInfo)
      elevationInfo.remove();
    }
  };

  addFields();
  checkDistance();
  checkSpeed();
  checkTime();
  checkElevation();
};

export { fieldsInputs };
