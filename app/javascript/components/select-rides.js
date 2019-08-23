import mapboxgl from 'mapbox-gl';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import 'leaflet/dist/leaflet';
import 'leaflet-easyprint/dist/bundle';


const polyline = require('@mapbox/polyline');
// var polyUtil = require('polyline-encoded');

const selectRide = () => {
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
            console.log(newArray[0]);
             // var marker = new L.marker(newArray[0], { opacity: 0.01 }); //opacity may be set to zero
             // marker.bindTooltip(`${button_i.dataset.title}`, {permanent: true, className: "my-label", offset: [0, 0], sticky: true, direction: 'bottom'});
             // marker.addTo(document.map);
            if (event.currentTarget.classList.contains("pressed")) {
              var trace_i = L.polyline(newArray, {color: 'red'});
              trace_i["_leaflet_id"] = j;
              trace_i.addTo(document.map);
              traces.addLayer(trace_i);
              console.log(traces);
            }
            else {
              const traceToRm = traces["_layers"][j];
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


const initMapbox = () => {

  document.map = L.map('mapid').setView([43.305, -1.5], 8);
  if (document.map) {

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
      id: 'mapbox.satellite',
      accessToken: 'pk.eyJ1IjoibWF0aGlhczIxODkiLCJhIjoiY2p6YjlsMTM1MDhjMTNncGg0M3M2Ymx3bCJ9.5DmaCa-Xj2popxvUOIeglQ'
    }).addTo(document.map);
  }
  var mmap = document.querySelector('#mapid')
  mmap.insertAdjacentHTML('beforeend','<div class="map-title"></div>')
  // <p class="titlet" data-title="<%= activity["name"] %></p>
};

var a3Size = {
  width: 2339,
  height: 3308,
  className: 'a3CssClass',
  tooltip: 'A custom A3 size'
}

const printMap = () => {
  document.printer = L.easyPrint({
  title: 'My awesome print button',
  position: 'bottomright',
  exportOnly: true,
  hidden: true,
  sizeModes: [a3Size]
}).addTo(document.map);

}

const addTitle = () => {
  var titleFrame = document.querySelector('.map-title');
  // var titleButton = document.querySelector('.btn-path');
  var titleField = document.querySelector('.ride-title');
  titleField.addEventListener('keyup', (event) => {
    titleFrame.innerHTML = `<p class="legend-title">${titleField.value}</p>`;
  });
};


export { initMapbox };
export { printMap };
export { selectRide };
export { addTitle };

