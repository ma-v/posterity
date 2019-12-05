import { generateUrl } from '../actions/init-map';

const switchToCheckout = () => {
	const orderButton = document.querySelector("#order-button");
	const backButton = document.querySelector("#back-button");
	const customBox = document.querySelector("#pills-customize-map");
	const checkout = document.querySelector("#pills-checkout");
	const mapTitleField = document.querySelector("#map_title");
	const mapFormat = document.querySelector("#map_format");
	const mapDistance = document.getElementById('map_distance');
	const mapElevation = document.getElementById('map_elevation');
	const mapSpeed = document.getElementById('map_speed');
	const mapTime = document.getElementById('map_time');
	const mapUrl = document.getElementById('map_map_url');

	const togglePills = () => {
		customBox.classList.toggle("show");
		customBox.classList.toggle("active");
		checkout.classList.toggle("show");
		checkout.classList.toggle("active");
	}

	if (orderButton) {
		orderButton.addEventListener("click", function() {
			togglePills();
			mapTitleField.value = document.querySelector(".ride-title").value;
			if (document.querySelector(".form-check .value-format:checked")) {
				mapFormat.value = document.querySelector(".form-check .value-format:checked").value ;
			}
			mapUrl.value = generateUrl();
			if (document.querySelector("#activity-distance").checked) {
				mapDistance.value = document.dist;
			} else {
				mapDistance.value = "";
			}

			if (document.querySelector("#activity-elevation").checked) {
				mapElevation.value = document.elev;
			} else {
				mapElevation.value = "";
			}

			if (document.querySelector("#activity-speed").checked) {
				mapSpeed.value = document.speed * 100;
			} else {
				mapSpeed.value = "";
			}

			if (document.querySelector("#activity-time").checked) {
				mapTime.value = document.time;
			} else {
				mapTime.value = "";
			}
		});
	}
	if (backButton) {
		backButton.addEventListener("click", togglePills);
	}
};

export {switchToCheckout};
