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
  const traces = L.featureGroup();
  	for (var i = 0; i <= 9; i++) {
    		const button_i = document.querySelector(`#activity_${i}`);
        let j = i;

        if (button_i) {
      		button_i.addEventListener("click", function() {
            event.currentTarget.classList.toggle("pressed");
            var polyline_i = button_i.dataset.polyline;
            coordinates[j] = polyline.toGeoJSON(`${polyline_i}`);
            let myCoordinates = coordinates[j].coordinates;
            const newArray = myCoordinates.map(function(ar) {
                const newAr = [];
                newAr[0] = ar[1];
                newAr[1] = ar[0];
                return newAr;
              });
            if (event.currentTarget.classList.contains("pressed")) { 
              var trace_i = L.polyline(newArray, {color: 'red'});
              trace_i["_leaflet_id"] = j;
              trace_i.addTo(map);
              traces.addLayer(trace_i);
              console.log(traces);
            }
            else {
              const traceToRm = traces["_layers"][j];
              map.removeLayer(traceToRm);
              traces.removeLayer(traceToRm);
            }
            
            map.fitBounds(traces.getBounds());

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

