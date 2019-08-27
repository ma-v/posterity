import mapboxgl from 'mapbox-gl';
import printPdf from 'mapbox-print-pdf';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import polyline from '@mapbox/polyline';

let map = null;
let currentTraceColor = "#0214BB";

 // créer la map avec Mapbox
const initMap = () => {
  const mapElement = document.getElementById('mapid');

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    map = new mapboxgl.Map({
      container: 'mapid',
      style: 'mapbox://styles/boboldo/cjzscv5r74lgd1cnmzxjxrht1',
      center: [5.400000, 43.300000],
      zoom: 10
    });
  }
  // eventListener sur le bouton print
  const printButton = document.querySelector("#print-map");
  printButton.addEventListener("click", (e) => { printMap(); });
  selectRide();
  selectColor();
  return map;
};

const selectColor = () => {
  const blueRide = document.querySelector("#blue-ride");
  const redRide = document.querySelector("#red-ride");
  const yellowRide = document.querySelector("#yellow-ride");
  const rideColorPicker = document.querySelector("#ride-color-picker");
  const blueTrace = "#0214BB";
  const redTrace = "red";
  const yellowTrace = "yellow";


  redRide.addEventListener("click", function(){
    currentTraceColor = redTrace;
  });

  blueRide.addEventListener("click", function(){
    currentTraceColor = blueTrace;
  });

  yellowRide.addEventListener("click", function(){
    currentTraceColor = yellowTrace;
  });

  // document.querySelectorAll('.btn-color').forEach(BtnColor => {
  //   BtnColor.addEventListener("click", () => {
  //     event.currentTarget.classList.toggle("pressed");

  //     const id = activityBtn.dataset.id
  //     redRide.addEventListener("click", () => {
  //     map.setPaintProperty(activityBtn, 'line-color', "red");
  //   });
  // });


}





let layerList = document.getElementById('menu');
if (layerList) {
  let inputs = layerList.getElementsByTagName('input');

  function switchLayer(layer) {
    let layerId = layer.target.id;
    map.setStyle('mapbox://styles/boboldo/' + layerId);

  }

  for (let i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
  }
}

 const printMap = () => {
  printPdf.build()
    .format('a3') // valeur à récuperer dans le DOM
    .portrait() // Unnecessary since it's the default but it's included for clarity.
    .print(map, mapboxgl)
    .then(function (pdf) {
      pdf.save('map.pdf');
    });
};

 const selectRide = () => {

  const allCoordinates = [];

  document.querySelectorAll('.activity-btn').forEach(activityBtn => {
    const id = activityBtn.dataset.id
    let polyline_i = activityBtn.dataset.polyline;
    allCoordinates[id] = polyline.toGeoJSON(`${polyline_i}`).coordinates;
  });

  document.querySelectorAll('.activity-btn').forEach(activityBtn => {
    activityBtn.addEventListener("click", () => {
      event.currentTarget.classList.toggle("pressed");

      const id = activityBtn.dataset.id
      if (activityBtn.classList.contains("pressed")) {
        map.addLayer({
          "id": `route_${id}`,
          "type": "line",
          "source": {
            "type": "geojson",
            "data": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": allCoordinates[id]
                }
            }
          },
          "layout": {
            "line-join": "round",
            "line-cap": "round",
            "visibility": "visible"
          },
          "paint": {
            "line-color": currentTraceColor,
            "line-width": 5
          }
        });
      } else {
        map.setLayoutProperty(`route_${id}`, 'visibility', 'none');
        map.removeLayer(`route_${id}`);
        map.removeSource(`route_${id}`);
      }
      let selectedCoordinates = [];
      document.querySelectorAll('.activity-btn.pressed').forEach(btn => {
        let id = btn.dataset.id
        allCoordinates[id].forEach(c => selectedCoordinates.push(c))
      })

      let bounds = selectedCoordinates.reduce((bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds(selectedCoordinates[0], selectedCoordinates[0]));

      if (bounds !== []) { map.fitBounds(bounds, { padding: 20 }); }
    });
  });
};

 export { initMap };
