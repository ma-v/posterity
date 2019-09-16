import mapboxgl from 'mapbox-gl';
import printPdf from 'mapbox-print-pdf';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import polyline from '@mapbox/polyline';
import axios from 'axios';
import { addFields } from '../actions/fields-input';
import { checkDistance } from '../actions/fields-input';
import { checkElevation } from '../actions/fields-input';
import { checkTime } from '../actions/fields-input';
import { checkSpeed } from '../actions/fields-input';

let map = null;
let currentTraceColor = "#0214BB";

 // créer la map avec Mapbox
const initMap = () => {
  const mapElement = document.getElementById('mapid');

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    map = new mapboxgl.Map({
      container: 'mapid',
      style: 'mapbox://styles/ma-v/cjzv3hkp30svs1cp5xeexv54g',
      center: [5.380000, 43.300000],
      zoom: 11.5
    });
    let frame = document.querySelector('#mapid');
    frame.insertAdjacentHTML('beforeend', '<div class="map-title"><div class="title-map"></div><div class="info-track"></div><div>')
  }

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

  const submitMap = document.getElementById('submit_map');
  const mapTitle = document.getElementById('map_title');
  const mapFormat = document.getElementById('map_format');
  const mapDistance = document.getElementById('map_distance');
  const mapElevation = document.getElementById('map_elevation');
  const mapSpeed = document.getElementById('map_speed');
  const mapTime = document.getElementById('map_time');
  
  if (submitMap) {
    submitMap.addEventListener('click', (event) => {
      let pdfFormat = ""
      if (mapFormat.value === '30x40cm - 39€'){
        pdfFormat = "a3";
      }
      if (mapFormat.value === '50x70cm - 59€') {
        pdfFormat = "b2";
      }
        printPdf.build()
          .format(pdfFormat)
          .portrait() // Unnecessary since it's the default but it's included for clarity.
          .print(map, mapboxgl)
          .then(function (pdf) {
            var rawData = pdf.output("blob");
            let myData = new FormData();
            myData.append("title", mapTitle.value);
            myData.append("image", rawData, "map.pdf");
            myData.append("format", mapFormat.value);
            myData.append("distance", mapDistance.value);
            myData.append("elevation", mapElevation.value);
            myData.append("speed", mapSpeed.value);
            myData.append("time", mapTime.value);

            let ordersAttributes = {first_name: document.getElementById('map_orders_attributes_0_first_name').value, last_name: document.getElementById('map_orders_attributes_0_last_name').value, address: document.getElementById('map_orders_attributes_0_address').value, email: document.getElementById('map_orders_attributes_0_email').value, state: "pending", map_sku: `map_${Math.floor(Math.random() * 1000000000)}`};
            myData = objectToFormData(ordersAttributes, myData, "orders_attributes[]");

             axios({
              method: 'POST',
              url: '/maps',
              data: myData,
              headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
              }
            }).then(function (response) { window.location.href = `/maps/${response.data.map_id}/orders/${response.data.id}/payments/new` });
            // .catch(function (error) {...}
          });

       }, false);

  }
  selectRide();
  addTitle();
  selectColor();
  return map;
};

const selectColor = () => {
  const blueRide = document.querySelector("#blue-ride");
  const whiteRide = document.querySelector("#white-ride");
  const fushiaRide = document.querySelector("#fushia-ride");
  const rideColorPicker = document.querySelector("#ride-color-picker");
  const blueTrace = "#0214BB";
  const whiteTrace = "white";
  const fushiaTrace = "#CD0067";


  document.querySelectorAll('.activity-btn').forEach(activityBtn => {

    if (whiteRide) {
    whiteRide.addEventListener("click", function(){
      currentTraceColor = whiteTrace;
      if (activityBtn.classList.contains("pressed")) {
        map.setPaintProperty(`route_${activityBtn.dataset.id}`, 'line-color', whiteTrace);
      }
    });
    }

    if (blueRide) {
    blueRide.addEventListener("click", function(){
      currentTraceColor = blueTrace;
      if (activityBtn.classList.contains("pressed")) {
        map.setPaintProperty(`route_${activityBtn.dataset.id}`, 'line-color', blueTrace);
      }
    });
    }

    if (fushiaRide) {
    fushiaRide.addEventListener("click", function(){
      currentTraceColor = fushiaTrace;
      if (activityBtn.classList.contains("pressed")) {
        map.setPaintProperty(`route_${activityBtn.dataset.id}`, 'line-color', fushiaTrace);
      }
    });
    }

    if (rideColorPicker) {
    rideColorPicker.addEventListener("change", function(){
      currentTraceColor = event.currentTarget.value;
      if (activityBtn.classList.contains("pressed")) {
        map.setPaintProperty(`route_${activityBtn.dataset.id}`, 'line-color', event.currentTarget.value);
      }
    });
    }
  });
}

let layerList = document.getElementById('menu');
if (layerList) {
  let inputs = layerList.getElementsByTagName('input');

  function switchLayer(layer) {
    let layerId = layer.id;
    map.setStyle('mapbox://styles/ma-v/' + layerId);
    map.on('style.load', function() {
      addLayersOnStyleLoad();
    })
  }

  const addLayersOnStyleLoad = () => {
    const allCoordinates = [];
    document.querySelectorAll('.activity-btn').forEach(activityBtn => {
      if (activityBtn.classList.contains("pressed")) {
        const id = activityBtn.dataset.id
        let polyline_i = activityBtn.dataset.polyline;
        allCoordinates[id] = polyline.toGeoJSON(`${polyline_i}`).coordinates;
        map.addLayer({
            "id": `route_${id}`,
            "type": "line",
            "source": {
              "type": "geojson",
              "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "LineString",
                  "coordinates": allCoordinates[id]
                  }
              }
            },
            "layout": {
              "line-join": "round",
              "line-cap": "round",
              "visibility": "visible"
            },
            "paint": {
              "line-color": currentTraceColor,
              "line-width": 5
            }
          });
        // let selectedCoordinates = [];
        // document.querySelectorAll('.activity-btn.pressed').forEach(btn => {
        //   let id = btn.dataset.id
        //   allCoordinates[id] = polyline.toGeoJSON(`${polyline_i}`).coordinates;
        //   allCoordinates[id].forEach(c => selectedCoordinates.push(c));
        // })
        // console.log(selectedCoordinates);
        // let bounds = selectedCoordinates.reduce((bounds, coord) => bounds.extend(coord),
        //   new mapboxgl.LngLatBounds(selectedCoordinates[0], selectedCoordinates[0]));

        // if (bounds !== []) { map.fitBounds(bounds, { padding: 40 }); }
      }
    });
  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("click", (event) => {
      switchLayer(event.currentTarget);
    });
  }


}

const addTitle = () => {
  let titleFrame = document.querySelector('.title-map');
  let titleField = document.querySelector('.ride-title');
  if (titleField) {
    titleField.addEventListener('keyup', (event) => {
    titleFrame.innerHTML = `<p class="legend-title">${titleField.value}</p>`;
    });
  }
};

 const printMap = () => {
  printPdf.build()
    .format('a2') // valeur à récuperer dans le DOM
    .portrait() // Unnecessary since it's the default but it's included for clarity.
    .print(map, mapboxgl)
    .then(function (pdf) {
      // Cloudinary::Uploader.upload(pdf);
      pdf.save('map.pdf');
    });
 };
  document.dist = 0;
  document.elev = 0;
  document.time = 0;

 const selectRide = () => {

  const allCoordinates = [];

  document.querySelectorAll('.activity-btn').forEach(activityBtn => {
    const id = activityBtn.dataset.id
    let polyline_i = activityBtn.dataset.polyline;
    allCoordinates[id] = polyline.toGeoJSON(`${polyline_i}`).coordinates;
  });

  document.querySelectorAll('.activity-btn').forEach(activityBtn => {
    activityBtn.addEventListener("click", () => {
      event.currentTarget.classList.toggle("pressed");

      const id = activityBtn.dataset.id

      if (activityBtn.classList.contains("pressed")) {
        document.dist += parseInt(activityBtn.dataset.distance);
        document.elev += parseInt(activityBtn.dataset.elevation);
        document.time += parseInt(activityBtn.dataset.time);
        document.speed = (document.dist)/(document.time);
        addFields();
        checkDistance();
        checkElevation();
        checkTime();
        checkSpeed();
        map.addLayer({
          "id": `route_${id}`,
          "type": "line",
          "source": {
            "type": "geojson",
            "data": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": allCoordinates[id]
                }
            }
          },
          "layout": {
            "line-join": "round",
            "line-cap": "round",
            "visibility": "visible"
          },
          "paint": {
            "line-color": currentTraceColor,
            "line-width": 5
          }
        });
      } else {
        document.dist -= parseInt(activityBtn.dataset.distance);
        document.elev -= parseInt(activityBtn.dataset.elevation);
        document.time -= parseInt(activityBtn.dataset.time);
        document.speed = 0;
        map.setLayoutProperty(`route_${id}`, 'visibility', 'none');
        map.removeLayer(`route_${id}`);
        map.removeSource(`route_${id}`);
      }
      let selectedCoordinates = [];
      document.querySelectorAll('.activity-btn.pressed').forEach(btn => {
        let id = btn.dataset.id
        allCoordinates[id].forEach(c => selectedCoordinates.push(c))
      })

      let bounds = selectedCoordinates.reduce((bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds(selectedCoordinates[0], selectedCoordinates[0]));

      if (bounds !== []) { map.fitBounds(bounds, { padding: 30 }); }
    });

  });
};

 export { initMap };
 export { selectRide };
