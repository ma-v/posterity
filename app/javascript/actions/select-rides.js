
import mapboxgl from 'mapbox-gl';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import 'leaflet/dist/leaflet';

const polyline = require('@mapbox/polyline');
// var polyUtil = require('polyline-encoded');

const selectRide = () => {
	let coordinates = [];
	const displayCoordinates = document.querySelector("#coordinates");
  const imageInput = document.querySelector("#map_image");
  const titleInput = document.querySelector("#map_title");
  const traces = L.featureGroup();
  	for (var i = 1; i <= 10; i++) {
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
              var trace_i = L.polyline(newArray, {color: document.currentTraceColor});
              trace_i["_leaflet_id"] = `id_${j}`;
              trace_i.addTo(document.map);
              traces.addLayer(trace_i);
            }
            else {
              const traceToRm = traces["_layers"][`id_${j}`];
              document.map.removeLayer(traceToRm);
              traces.removeLayer(traceToRm);
            }
            
            document.map.fitBounds(traces.getBounds());

            // add title and image to form input values
            titleInput.value = button_i.dataset.title;
            imageInput.value = button_i.dataset.image;
      		})
        }
  	};
  }

export { selectRide };

