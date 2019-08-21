import "bootstrap";
import { selectRide } from '../components/select-rides';
import { loadImage } from '../components/select-rides';



import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import mapboxgl from 'mapbox-gl';

import { injectCoordinates} from '../components/geocode';
import { initMapbox } from '../components/select-rides';
// import { selectRide } from '../components/select-rides';

var map = initMapbox();
selectRide(map);
loadImage(coordinates);
