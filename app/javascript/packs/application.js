import "bootstrap";

//IMPORT CSS
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { animateTitle } from '../actions/animated-title'
import { animateOrderCard } from '../actions/animated-order-card'


//IMPORT JS
import { initMap } from '../actions/init-map';

import {switchToCheckout} from '../actions/customize-map-box';
switchToCheckout();
animateTitle();
animateOrderCard();

//INIT MAP
initMap(); // init la map et toutes ces fonctions
