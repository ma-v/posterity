import "bootstrap";
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// import mapboxgl from 'mapbox-gl';

import { injectCoordinates} from '../components/geocode';
import { initMapbox } from '../components/select-rides';
import { printMap } from '../components/select-rides';
import { selectRide } from '../components/select-rides';

initMapbox();
selectRide();

//Queryselector sur le bouton avec id print
const mapToPrint = document.querySelector("#print-map");
//addEventListener au click
  printMap();
mapToPrint.addEventListener("click", (e) => {
  document.printer.printMap('CurrentSize', 'MyManualPrint');
});
// Et on appele la fonction printMap(mapWithTrace)


