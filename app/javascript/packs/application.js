import "bootstrap";

//IMPORT CSS
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

//IMPORT JS
import { animateTitle } from '../actions/animated-title';
animateTitle();

import { initMap } from '../actions/init-map';
initMap();

import { displayActivities } from '../actions/display-activities';
displayActivities();

import {switchToCheckout} from '../actions/switch-to-checkout';
switchToCheckout();

import { loadLoader } from '../actions/loader';
loadLoader();
