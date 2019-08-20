import "bootstrap";

import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import { initMapbox } from '../plugins/init_mapbox';
import { AddTracking } from '../plugins/init_mapbox';

var map = initMapbox();
AddTracking(map);
