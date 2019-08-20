import mapboxgl from 'mapbox-gl';
import mapboxDraw from '@mapbox/mapbox-gl-draw';

const polyline = require('@mapbox/polyline');

const selectRide = (map) => {
	let coordinates = [];
	const displayCoordinates = document.querySelector("#coordinates");
  	for (var i = 0; i <= 9; i++) {
    		const button_i = document.querySelector(`#activity_${i}`);
        let j = i;

        if (button_i) {
      		button_i.addEventListener("click", function() {
            const polyline_i = button_i.dataset.polyline;
      			coordinates[j] = polyline.toGeoJSON(`${polyline_i}`);
      			displayCoordinates.innerText = coordinates[j]["coordinates"];
            let myCoordinates = coordinates[j];

            // centrer la map sur les coordonnees
            map.flyTo({center: myCoordinates.coordinates[0]});
            console.log(myCoordinates.coordinates.slice(0,10))
            // passer les coord a AddTracking
            AddTracking(map,myCoordinates.coordinates, j)
      		})
        }
  	}
  	return coordinates;
  }


const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [2.213749,46.227638],
      zoom: 8
    });
  }
    return map;
};

const AddTracking = (map, coordinates, i) => {
  const button = document.querySelector("#button");
  // var scale = EXTENT / coordinates.extent;
  // var geometry = coordinates.loadGeometry();

  // map.addlayer({});

      map.addLayer({
        "id": `route_${i}`,
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": coordinates
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#888",
          "line-width": 8
        }
      });
};


// var toggleableLayerIds = [ 'contours', 'museums' ];

// for (var i = 0; i < toggleableLayerIds.length; i++) {
// var id = toggleableLayerIds[i];

// var link = document.createElement('a');
// link.href = '#';
// link.className = 'active';
// link.textContent = id;

// link.onclick = function (e) {
// var clickedLayer = this.textContent;
// e.preventDefault();
// e.stopPropagation();

// var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

// if (visibility === 'visible') {
// map.setLayoutProperty(clickedLayer, 'visibility', 'none');
// this.className = '';
// } else {
// this.className = 'active';
// map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
// }
// };

export { initMapbox };
export { AddTracking };





export {selectRide};
