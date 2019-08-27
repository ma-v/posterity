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
      center: [5.400000, 43.300000],
      zoom: 10
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

  const allCoordinates = [];

  document.querySelectorAll('.activity-btn').forEach(activityBtn => {
    const id = activityBtn.dataset.id
    let polyline_i = activityBtn.dataset.polyline;
    allCoordinates[id] = polyline.toGeoJSON(`${polyline_i}`).coordinates;
  });

  // const displayCoordinates = document.querySelector("#coordinates");
  // const imageInput = document.querySelector("#map_image");
  // const titleInput = document.querySelector("#map_title");

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

  // for (var i = 1; i <= 10; i++) {
  //   const button_i = document.querySelector(`#activity_${i}`);
  //   let j = i;

     // if (button_i) {
     //  button_i.addEventListener("click", function () {


 //        let myCoordinates = coordinates[j].coordinates;
 //        // allCoordinates.push(myCoordinates);
 //        // console.log(allCoordinates[0]);

 //        // const newArray = myCoordinates.map(function(ar) {
 //        //     const newAr = [];
 //        //     newAr[0] = ar[1];
 //        //     newAr[1] = ar[0];
 //        //     return newAr;
 //        //   });
 //        if (event.currentTarget.classList.contains("pressed")) {


 //          // if (typeof mapLayer !== 'undefined') {
 //          //   map.setLayoutProperty(`route_${j}`, 'visibility', 'visible');
 //          // }


 //        // const reducer = (accumulator, currentValue) => accumulator + currentValue;
 //        // allCoordinates = allCoordinates.reduce(reducer);

 //        map.fitBounds(bounds, {
 //          padding: 20
 //        });

 //        //document.map.fitBounds(traces.getBounds());
 //        titleInput.value = button_i.dataset.title;
 //        imageInput.value = button_i.dataset.image;
 //        }
 //      );
 //    }
 //  }
 // };
 export { initMap };
