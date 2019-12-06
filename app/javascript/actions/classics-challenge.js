import mapboxgl from 'mapbox-gl';
import printPdf from 'mapbox-print-pdf';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import polyline from '@mapbox/polyline';
import axios from 'axios';
import { fieldsInputs } from '../actions/fields-input';
import * as turf from '@turf/turf';

let map = null;
const ccMap = document.querySelector("#classics_challenge_map");
let allCoordinates = [];
let selectedCoordinates = [];
let allPolylines = [];
let selectedPolylines = [];
const yellowStyle = document.querySelector(".btn-cc-yellow");
const whiteStyle = document.querySelector(".btn-cc-white");
document.dist = 0;
document.elev = 0;
document.time = 0;

const initCcMap = () => {
  if (ccMap) {
    mapboxgl.accessToken = ccMap.dataset.mapboxApiKey;
    map = new mapboxgl.Map({
      container: 'classics_challenge_map',
      style: `mapbox://styles/ma-v/ck2kdyw7z0e5t1ck0ffszwwh3`,
      center: [2.244501165260317, 48.25895909243698],
      zoom: 7.489156596090959,
      interactive: false
    });
    ccMap.classList.add("small");
    const mapCanvas = document.querySelector('.mapboxgl-canvas');
    mapCanvas.style.width = "100%";
    mapCanvas.style.height = "100%";
    let frame = document.querySelector('#classics_challenge_map');
    frame.insertAdjacentHTML('beforeend', '<div class="classics_challenge_legend"><div class="name-map"></div><div class="cc-distance"></div><div class="cc-elev"></div><div>');
    frame.insertAdjacentHTML('beforeend', '<div class="classics_challenge_map_logo"><div>');
  }

    selectRide();
    addDistCc();
    addElevCc();
    addNameCc();
}

const selectRide = () => {
  document.querySelectorAll('.activity-cc-btn').forEach(activityBtn => {
    const id = activityBtn.dataset.id
    let polyline_i = activityBtn.dataset.polyline;
    allCoordinates[id] = polyline.toGeoJSON(`${polyline_i}`).coordinates;
    allPolylines[id] = polyline_i;
  });

  document.querySelectorAll('.activity-cc-btn').forEach(activityBtn => {
    activityBtn.addEventListener("click", () => {
      event.currentTarget.classList.toggle("pressed");
      const id = activityBtn.dataset.id;

      if (activityBtn.classList.contains("pressed")) {
        document.dist += parseInt(activityBtn.dataset.distance);
        document.elev += parseInt(activityBtn.dataset.elevation);
        const curvedLine = turf.bezierSpline(turf.lineString(allCoordinates[id]), {
          "resolution": 1000000,
          "sharpness": 0
        });
        addDistCc();
        addElevCc();
        map.addLayer({
          "id": `route_${id}`,
          "type": "line",
          "source": {
            "type": "geojson",
            "data": curvedLine
          },
          "layout": {
            "line-join": "round",
            "line-cap": "round",
            "visibility": "visible"
          },
          "paint": {
            "line-color": "#0E0000",
            "line-width": 5
          }
        });
      } else {
        document.dist -= parseInt(activityBtn.dataset.distance);
        document.elev -= parseInt(activityBtn.dataset.elevation);
        addDistCc();
        addElevCc();
        map.setLayoutProperty(`route_${id}`, 'visibility', 'none');
        map.removeLayer(`route_${id}`);
        map.removeSource(`route_${id}`);
      }
      selectedCoordinates = [];
      selectedPolylines = [];
      document.querySelectorAll('.activity-cc-btn.pressed').forEach(btn => {
        let id = btn.dataset.id;
        allCoordinates[id].forEach(c => selectedCoordinates.push(c));
        selectedPolylines.push(allPolylines[id]);
      })
    });
  });
};




const changeCcStyle = () => {
  if (yellowStyle) {
    yellowStyle.addEventListener("click", event => {
      console.log("switching");
      const url = "https://api.mapbox.com/styles/v1/ma-v/cjzv3hkp30svs1cp5xeexv54g/static/2.3322219,48.856614,11.3/914x1280?access_token=pk.eyJ1IjoibWEtdiIsImEiOiJjazJ2cGRvNWUwNng0M21ucWQzcGFqY2g2In0.WBlEoavgZb1PPFxXqtKKqQ&logo=false";
      ccMap.style.backgroundImage = `url(${url})`;
    })
  }

  if (whiteStyle) {
    whiteStyle.addEventListener("click", event => {
      console.log("switching");
      const url = "https://api.mapbox.com/styles/v1/ma-v/ck2kdyw7z0e5t1ck0ffszwwh3/static/2.3322219,48.856614,11.3/914x1280?access_token=pk.eyJ1IjoibWEtdiIsImEiOiJjazJ2cGRvNWUwNng0M21ucWQzcGFqY2g2In0.WBlEoavgZb1PPFxXqtKKqQ&logo=false";
      ccMap.style.backgroundImage = `url(${url})`;
    })
  }
}

const addNameCc = () => {
  const addName = () => {
    let nameFrame = document.querySelector('.name-map');
    let nameField = document.querySelector('.ride-title');
    if (nameField) {
      nameFrame.innerHTML = `<p class="legend-name">${nameField.value}</p>`;
      nameField.addEventListener('keyup', (event) => {
        nameFrame.innerHTML = `<p class="legend-name">${nameField.value}</p>`;
      });
    }
  };
  addName();
};

const addDistCc = () => {
  const addDist = () => {
    let distFrame = document.querySelector('.cc-distance');
    distFrame.innerHTML = `<p class="legend-dist">${Math.round(document.dist/1000)} KM</p>`;
  };
  addDist();
};

const addElevCc = () => {
  const addElev = () => {
    let elevFrame = document.querySelector('.cc-elev');
    elevFrame.innerHTML = `<p class="legend-elev">${document.elev} M.</p>`;
  };
  addElev();
};

export { initCcMap };
export { changeCcStyle };
