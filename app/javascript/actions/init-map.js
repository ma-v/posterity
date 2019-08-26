import mapboxgl from 'mapbox-gl';
import printPdf from 'mapbox-print-pdf';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import polyline from '@mapbox/polyline';

let map = null;

// créer la map avec Mapbox
const initMap = () => {
  const mapElement = document.getElementById('mapid');
  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    map = new mapboxgl.Map({
      container: 'mapid',
      style: 'mapbox://styles/boboldo/cjzscv5r74lgd1cnmzxjxrht1',
      center: [5.400000, 43.300000],//[5.400000, 43.300000],
      zoom: 15
    });
  }
  // eventListener sur le bouton print
  const printButton = document.querySelector("#print-map");
  printButton.addEventListener("click", (e) => { printMap(); });
  selectRide();
  return map;
};

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

  const allCoordinates = []
  document.querySelectorAll('.activity-btn').forEach(activityBtn => {
    // array of objects : key is id, value is an array of coordinates
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
            "line-color": "#0214BB",
            "line-width": 5
          }
        });
      } else {
        map.setLayoutProperty(`route_${id}`, 'visibility', 'none');
        map.removeLayer(`route_${id}`);
        map.removeSource(`route_${id}`);
      }
      let selectedCoordinates = []
      document.querySelectorAll('.activity-btn.pressed').forEach(btn => {
        let id = btn.dataset.id
        allCoordinates[id].forEach(c => selectedCoordinates.push(c))
      })

      console.log('SELECTED', selectedCoordinates);

      let bounds = selectedCoordinates.reduce((bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds(selectedCoordinates[0], selectedCoordinates[0]));

      if (bounds !== []) { map.fitBounds(bounds, { padding: 20 }); }
    });

  });
};

export { initMap };
