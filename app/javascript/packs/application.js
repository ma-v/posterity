import "bootstrap";

//IMPORT CSS
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { animateTitle } from '../actions/animated-title'


//IMPORT JS
import { initMap } from '../actions/init-map';

import {switchToCheckout} from '../actions/customize-map-box';
switchToCheckout();
animateTitle();

//INIT MAP
initMap(); // init la map et toutes ses fonctions
