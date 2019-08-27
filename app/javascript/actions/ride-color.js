import 'leaflet/dist/leaflet';


const changeRideColor = () => {
	const blueRide = document.querySelector("#blue-ride");
	const redRide = document.querySelector("#red-ride");
	const yellowRide = document.querySelector("#yellow-ride");
	const rideColorPicker = document.querySelector("#ride-color-picker");
	const blueTrace = "#0214BB";
	const redTrace = "red";
	const yellowTrace = "yellow";
	document.currentTraceColor = "#0214BB";

	const changeLayerColor = (newColor) => {
	const mapLayers = Object.entries(document.map["_layers"]);
		mapLayers.forEach((array) => {
			if (array[0].includes("id") ) {
				array[1].setStyle({
					color: newColor
				});
				console.log(mapLayers);
			}
		});
	}

	rideColorPicker.addEventListener("change", function(){
		changeLayerColor(event.currentTarget.value);
		document.currentTraceColor = event.currentTarget.value;
	});

	blueRide.addEventListener("click", function(){
		changeLayerColor(blueTrace);
		document.currentTraceColor = blueTrace;
	});
	redRide.addEventListener("click", function(){
		changeLayerColor(redTrace);
		document.currentTraceColor = redTrace;
	});
	yellowRide.addEventListener("click", function(){
		changeLayerColor(yellowTrace);
		document.currentTraceColor = yellowTrace;
	});
}



export {changeRideColor};
