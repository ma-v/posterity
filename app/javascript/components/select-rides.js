import mapboxgl from 'mapbox-gl';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import 'leaflet/dist/leaflet';
import 'leaflet-easyprint/dist/bundle';


const polyline = require('@mapbox/polyline');
// var polyUtil = require('polyline-encoded');

const selectRide = () => {
	let coordinates = [];
	const displayCoordinates = document.querySelector("#coordinates");
  const imageInput = document.querySelector("#map_image")
  const titleInput = document.querySelector("#map_title")
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
              return newAr
            });

            var trace = L.polyline(newArray, {color: 'red'}).addTo(document.map);
            document.map.fitBounds(trace.getBounds());

            // add title and image to form input values
            titleInput.value = button_i.dataset.title
            imageInput.value = button_i.dataset.image
      		})
        }
  	};
  }


const initMapbox = () => {

  document.map = L.map('mapid').setView([43.305, -1.5], 8);
  if (document.map) {

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.satellite',
      accessToken: 'pk.eyJ1IjoibWF0aGlhczIxODkiLCJhIjoiY2p6YjlsMTM1MDhjMTNncGg0M3M2Ymx3bCJ9.5DmaCa-Xj2popxvUOIeglQ'
    }).addTo(document.map);
  }
};

const printMap = () => {
  document.printer = L.easyPrint({
  title: 'My awesome print button',
  position: 'bottomright',
  sizeModes: ['A4Portrait', 'A4Landscape']
}).addTo(document.map);

}


export { initMapbox };
export { printMap };
export { selectRide };

