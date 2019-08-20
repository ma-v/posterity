const polyline = require('@mapbox/polyline');

const selectRide = () => {
	let coordinates = []; 
	const displayCoordinates = document.querySelector("#coordinates");
	for (var i = 0; i <= 9; i++) {
  		const button_i = document.querySelector(`#activity_${i}`);
  		const polyline_i = button_i.dataset.polyline;
  		button_i.addEventListener("click", function() {
  			coordinates[i] = polyline.toGeoJSON(`${polyline_i}`);
  			displayCoordinates.innerText = coordinates[i]["coordinates"];
  		})
	}	
	return coordinates;
}

export {selectRide};
