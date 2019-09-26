import "bootstrap";

//IMPORT CSS
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { animateTitle } from '../actions/animated-title';


//IMPORT JS
import { initMap } from '../actions/init-map';
import { loadLoader } from '../actions/loader';


import {switchToCheckout} from '../actions/customize-map-box';
initMap();
switchToCheckout();
animateTitle();
loadLoader();

//INIT MAP


$(document).ready(function(){
  $(".content").slice(0, 4).show();
  $("#loadMore").on("click", function(e){
    e.preventDefault();
    $(".content:hidden").slice(0, 4).slideDown();
    if($(".content:hidden").length == 0) {
      $("#loadMore").text("No Content").addClass("noContent");
    }
  });
}) // init la map et toutes ces fonctions
