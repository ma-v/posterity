import "bootstrap";
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// import mapboxgl from 'mapbox-gl';

import { injectCoordinates} from '../actions/geocode';
import { initMapbox } from '../actions/init-mapbox';
import { printMap } from '../actions/print-map';
import { selectRide } from '../actions/select-rides';

initMapbox();
selectRide();

//Queryselector sur le bouton avec id print
const mapToPrint = document.querySelector("#print-map");
//addEventListener au click

mapToPrint.addEventListener("click", (e) => {
  printMap();
  document.printer.printMap("a3CssClass", 'MyManualPrint');
});

// Et on appele la fonction printMap(mapWithTrace)

import {changeRideColor} from '../actions/ride-color';
changeRideColor();