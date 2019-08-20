const polyline = require('@mapbox/polyline');

const selectRide = () => {
	let coordinates = []; 
	const displayCoordinates = document.querySelector("#coordinates");
  	for (var i = 0; i <= 9; i++) {
    		const button_i = document.querySelector(`#activity_${i}`);
        if (button_i) {
      		button_i.addEventListener("click", function() {
            const polyline_i = button_i.dataset.polyline;
      			coordinates[i] = polyline.toGeoJSON(`${polyline_i}`);
      			displayCoordinates.innerText = coordinates[i]["coordinates"];
      		})  
        }
  	}	
  	return coordinates; 
  }

export {selectRide};
