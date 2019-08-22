import 'leaflet/dist/leaflet';

const changeRideColor = () => {
	const blueRide = document.querySelector("#blue-ride");
	const redRide = document.querySelector("#red-ride");
	const yellowRide = document.querySelector("#yellow-ride");
	const blue = "#0214BB";
	const red = "red";
	const yellow = "yellow";

	blueRide.addEventListener("click", function () {
		document.map["_layers"][3]["options"]["color"] = red;
	});
}

export {changeRideColor};