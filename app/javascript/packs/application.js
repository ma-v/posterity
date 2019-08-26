import "bootstrap";

//IMPORT CSS
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'


//IMPORT JS
import { initMap } from '../actions/init-map';


import { switchToCheckout } from '../actions/customize-map-box';
switchToCheckout();

//INIT MAP
initMap(); // init la map et toutes ces fonctions




