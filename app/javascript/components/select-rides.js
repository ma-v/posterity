import mapboxgl from 'mapbox-gl';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import 'leaflet/dist/leaflet';

const polyline = require('@mapbox/polyline');
// var polyUtil = require('polyline-encoded');

const selectRide = (map) => {
	let coordinates = [];
	const displayCoordinates = document.querySelector("#coordinates");
  const imageInput = document.querySelector("#map_image");
  const titleInput = document.querySelector("#map_title");
  	for (var i = 0; i <= 9; i++) {
    		const button_i = document.querySelector(`#activity_${i}`);
        let j = i;

        if (button_i) {
      		button_i.addEventListener("click", function() {
            var polyline_i = button_i.dataset.polyline;
            coordinates[j] = polyline.toGeoJSON(`${polyline_i}`);
            let myCoordinates = coordinates[j].coordinates;
            const newArray = myCoordinates.map(function(ar) {
              const newAr = [];
              newAr[0] = ar[1];
              newAr[1] = ar[0];
              return newAr;
            });

            var trace = L.polyline(newArray, {color: 'red'}).addTo(map);
            map.fitBounds(trace.getBounds());

            // add title and image to form input values
            titleInput.value = button_i.dataset.title;
            imageInput.value = button_i.dataset.image;
      		})
        }
  	}
  	return coordinates;
  }


const initMapbox = () => {
  var map = L.map('mapid').setView([43.305, -1.5], 8);
  if (map) {

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.satellite',
      accessToken: 'pk.eyJ1IjoibWF0aGlhczIxODkiLCJhIjoiY2p6YjlsMTM1MDhjMTNncGg0M3M2Ymx3bCJ9.5DmaCa-Xj2popxvUOIeglQ'
    }).addTo(map);
  }
    return map;
};


export { initMapbox };
export {selectRide};

