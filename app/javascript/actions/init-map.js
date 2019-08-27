import mapboxgl from 'mapbox-gl';
import printPdf from 'mapbox-print-pdf';
import mapboxDraw from '@mapbox/mapbox-gl-draw';
import polyline from '@mapbox/polyline';
import axios from 'axios';

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
      // Cloudinary::Uploader.upload(pdf);
      pdf.save('map.pdf');
    });
};

 const selectRide = () => {
  let coordinates = [];
  // let allCoordinates = [];
  const displayCoordinates = document.querySelector("#coordinates");
  const imageInput = document.querySelector("#map_image");
  const titleInput = document.querySelector("#map_title");
  // const traces = L.featureGroup(); --> BOUNDS LIMITS

  for (var i = 1; i <= 10; i++) {
    const button_i = document.querySelector(`#activity_${i}`);
    let j = i;

     if (button_i) {
      button_i.addEventListener("click", function () {
        event.currentTarget.classList.toggle("pressed");
        var polyline_i = button_i.dataset.polyline;
        coordinates[j] = polyline.toGeoJSON(`${polyline_i}`);
        let myCoordinates = coordinates[j].coordinates;
        // allCoordinates.push(myCoordinates);
        // console.log(allCoordinates[0]);

        // const newArray = myCoordinates.map(function(ar) {
        //     const newAr = [];
        //     newAr[0] = ar[1];
        //     newAr[1] = ar[0];
        //     return newAr;
        //   });
        if (event.currentTarget.classList.contains("pressed")) {


          // if (typeof mapLayer !== 'undefined') {
          //   map.setLayoutProperty(`route_${j}`, 'visibility', 'visible');
          // }

            map.addLayer({
              "id": `route_${j}`,
              "type": "line",
              "source": {
                "type": "geojson",
                "data": {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                    "type": "LineString",
                    "coordinates": myCoordinates
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
            // map.setLayoutProperty(`route_${j}`, 'visibility', 'visible')
          }
          else {
            map.setLayoutProperty(`route_${j}`, 'visibility', 'none');
            map.removeLayer(`route_${j}`);
            map.removeSource(`route_${j}`);
          }

        // const reducer = (accumulator, currentValue) => accumulator + currentValue;
        // allCoordinates = allCoordinates.reduce(reducer);
        var bounds = myCoordinates.reduce(function(bounds, coord) {
        return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(myCoordinates[0], myCoordinates[0]));

        map.fitBounds(bounds, {
          padding: 20
        });

        //document.map.fitBounds(traces.getBounds());
        titleInput.value = button_i.dataset.title;
        }
      );
    }
  }
 };
 export { initMap };
