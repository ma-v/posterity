import mapboxgl from 'mapbox-gl';
import printPdf from 'mapbox-print-pdf';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import polyline from '@mapbox/polyline';
import axios from 'axios';

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
  var objectToFormData = function(obj, form, namespace) {
      
    var fd = form || new FormData();
    var formKey;
    
    for(var property in obj) {
      if(obj.hasOwnProperty(property)) {
        
        if(namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
       
        // if the property is an object, but not a File,
        // use recursivity.
        if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          
          objectToFormData(obj[property], fd, property);
          
        } else {
          
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
        
      }
    }
    
    return fd;
      
  };

  const submitMap = document.getElementById('submit_map');
  if (submitMap) {
    submitMap.addEventListener('click', (event) => {
        printPdf.build()
          .format('a4') // valeur à récuperer dans le DOM
          .portrait() // Unnecessary since it's the default but it's included for clarity.
          .print(map, mapboxgl)
          .then(function (pdf) {
            // pdf.save('map.pdf');
            
            var rawData = pdf.output("blob");
            document.blob = rawData;
            document.pdf = pdf;
            let myData = new FormData();
            myData.append("title", "test");
            myData.append("image", rawData, "map.pdf");
            myData.append("format", document.getElementById('map_format').value);
            //myData.append("orders_attributes[]", );
            document.myData = myData;
            let ordersAttributes = {first_name: document.getElementById('map_orders_attributes_0_first_name').value, last_name: document.getElementById('map_orders_attributes_0_last_name').value, address: document.getElementById('map_orders_attributes_0_address').value};
            myData = objectToFormData(ordersAttributes, myData, "orders_attributes[]");
            /*let mydata = {
              map: {
                title: "test", 
                image: rawData,
                orders_attributes: [{first_name: document.getElementById('map_orders_attributes_0_first_name').value, last_name: document.getElementById('map_orders_attributes_0_last_name').value}]    
              }
            }*/
            //document.mydata = mydata;

             axios({
              method: 'POST',
              url: '/maps',
              data: myData,
              headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
              }
            }).then(function (response) { window.location.href = `/maps/${response.data.id}/orders/confirmation` })
            // .catch(function (error) {...}
          })

       }, false);

  }
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
    // map.getStyle('line-color', redTrace).layers;
    console.log(map.setPaintProperty(`route_${id}`, 'line-color', "red"));

    // map.removeLayer(`route_${id}`);
    // map.removeSource(`route_${id}`);

  });

  blueRide.addEventListener("click", function(){
    currentTraceColor = blueTrace;
  });

  yellowRide.addEventListener("click", function(){
    currentTraceColor = yellowTrace;
  });

  rideColorPicker.addEventListener("change", function(){
    currentTraceColor = event.currentTarget.value;
  });
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
      // Cloudinary::Uploader.upload(pdf);
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
