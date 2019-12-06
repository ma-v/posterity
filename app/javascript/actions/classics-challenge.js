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
const submitMap = document.getElementById('submit_cc_map');
const mapNameField = document.getElementById('map_title');
const mapFormat = document.getElementById('map_format');
const mapDistance = document.getElementById('map_distance');
const mapElevation = document.getElementById('map_elevation');
const mapSpeed = document.getElementById('map_speed');
const mapTime = document.getElementById('map_time');
const mapUrl = document.getElementById('map_map_url');
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
    switchToCheckout();
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

var objectToFormData = function(obj, form, namespace) {
  var fd = form || new FormData();
  var formKey;
  for(var property in obj) {
    if(obj.hasOwnProperty(property)) {
      if(namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objectToFormData(obj[property], fd, property);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }
  return fd;
};

const generateCcUrl = () => {
  let currentZoom = map.getZoom();
  let currentCenter = map.getCenter();
  let accessToken = ccMap.dataset.mapboxApiKey;
  if (selectedPolylines && selectedPolylines.length > 0) {
    const urlPolylines = selectedPolylines.map(polyline => {
      return `path-5+0e0000(${encodeURIComponent(polyline)})`
    }).join(",");
    let url = `https://api.mapbox.com/styles/v1/ma-v/ck2kdyw7z0e5t1ck0ffszwwh3/static/${urlPolylines}/${currentCenter.lng},${currentCenter.lat},${currentZoom}/914x1280@2x?access_token=${accessToken}&logo=false`;
    return url;
  } else {
    let url = `https://api.mapbox.com/styles/v1/ma-v/ck2kdyw7z0e5t1ck0ffszwwh3/static/${currentCenter.lng},${currentCenter.lat},${currentZoom}/914x1280@2x?access_token=${accessToken}&logo=false`;
    return url;
  }
}

const switchToCheckout = () => {
	const orderButton = document.querySelector("#order-cc-button");
	const backButton = document.querySelector("#back-cc-button");
	const customBox = document.querySelector("#pills-customize-map");
	const checkout = document.querySelector("#pills-checkout");
	const mapNameField = document.querySelector("#map_title");
	const mapDistance = document.getElementById('map_distance');
	const mapElevation = document.getElementById('map_elevation');
	const mapSpeed = document.getElementById('map_speed');
	const mapTime = document.getElementById('map_time');
	const mapUrl = document.getElementById('map_map_url');

	const togglePills = () => {
		customBox.classList.toggle("show");
		customBox.classList.toggle("active");
		checkout.classList.toggle("show");
		checkout.classList.toggle("active");
	}

	if (orderButton) {
		orderButton.addEventListener("click", function() {
			togglePills();
			mapNameField.value = document.querySelector(".ride-title").value;
			mapUrl.value = generateCcUrl();
      mapFormat.value = '30x45cm - 39€';
			mapDistance.value = document.dist;
			mapElevation.value = document.elev;
      mapSpeed.value = 0;
      mapTime.value = 0;
		});
	}
	if (backButton) {
		backButton.addEventListener("click", togglePills);
	}
};

if (submitMap) {
  submitMap.addEventListener('click', (event) => {
    let pdfFormat = "";
    if (ccMap) {
      pdfFormat = "a2";
      printPdf.build()
      .format(pdfFormat)
      .portrait() // Unnecessary since it's the default but it's included for clarity.
      .print(map, mapboxgl)
      .then(function (pdf) {
        var rawData = pdf.output("blob");
        let myData = new FormData();
        myData.append("title", document.querySelector('.ride-title').value);
        if (mapUrl.value.length > 7800) {
          myData.append("image", rawData, "map.pdf");
        } else {
          myData.append("map_url", mapUrl.value);
        }
        myData.append("format", mapFormat.value);
        myData.append("distance", mapDistance.value);
        myData.append("elevation", mapElevation.value);
        myData.append("speed", 0);
        myData.append("time", 0);
        myData.append("strava_id", document.getElementById('map_orders_attributes_0_strava_id').value);

        let ordersAttributes = {
          first_name: document.getElementById('map_orders_attributes_0_first_name').value,
          last_name: document.getElementById('map_orders_attributes_0_last_name').value,
          email: document.getElementById('map_orders_attributes_0_email').value,
          phone: document.getElementById('map_orders_attributes_0_phone').value,
          address: document.getElementById('map_orders_attributes_0_address').value,
          post_code: document.getElementById('map_orders_attributes_0_post_code').value,
          city: document.getElementById('map_orders_attributes_0_city').value,
          country: document.getElementById('map_orders_attributes_0_country').value,
          state: "pending",
          map_sku: `map_${Math.floor(Math.random() * 1000000000)}`
        };
        myData = objectToFormData(ordersAttributes, myData, "orders_attributes[]");

        axios({
          method: 'POST',
          url: '/maps',
          data: myData,
          headers: {
            'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
          }
        }).then(function (response) {
          window.location.href = `/maps/${response.data.map_id}/orders/${response.data.id}/payments/new`
        });
        // .catch(function (error) {...}
      });
    }
  }, false);
}


const changeCcStyle = () => {
  if (yellowStyle) {
    yellowStyle.addEventListener("click", event => {
      const url = "https://api.mapbox.com/styles/v1/ma-v/cjzv3hkp30svs1cp5xeexv54g/static/2.3322219,48.856614,11.3/914x1280?access_token=pk.eyJ1IjoibWEtdiIsImEiOiJjazJ2cGRvNWUwNng0M21ucWQzcGFqY2g2In0.WBlEoavgZb1PPFxXqtKKqQ&logo=false";
      ccMap.style.backgroundImage = `url(${url})`;
    })
  }

  if (whiteStyle) {
    whiteStyle.addEventListener("click", event => {
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
