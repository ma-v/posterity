import "bootstrap";
import { selectRide } from '../components/select-rides';



import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import mapboxgl from 'mapbox-gl';

import { injectCoordinates} from '../components/geocode';
import { initMapbox } from '../components/select-rides';
// import { selectRide } from '../components/select-rides';

var map = initMapbox();
selectRide(map);

const formElement = document.getElementById('searchForm');
if (formElement) {
	formElement.addEventListener('submit', (event) => {

	  event.preventDefault();

	  const address = document.getElementById('address').value;
	  const mapboxKey = 'yourApiKey';
	  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWF0aGlhczIxODkiLCJhIjoiY2p6YjlsMTM1MDhjMTNncGg0M3M2Ymx3bCJ9.5DmaCa-Xj2popxvUOIeglQ`)
	    .then(response => response.json())
	    .then((data) => {
	      const coordinates = {
	        lng: data.features[0].geometry.coordinates[0],
	        lat: data.features[0].geometry.coordinates[1]
	      };
	      injectCoordinates(coordinates);
	      });
	});
}
