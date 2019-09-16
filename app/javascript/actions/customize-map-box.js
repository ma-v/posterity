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
			mapFormat.value = document.querySelector(".form-check .value-format:checked").value;
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
				mapSpeed.value = document.speed;
			} else {
				mapSpeed.value = "";
			}

			if (document.querySelector("#activity-time").checked) {
				mapTime.value = document.time;
			} else {
				mapTime.value = "";
			}
		});

		backButton.addEventListener("click", togglePills);
		}
}

$(document).ready(function() {
    let mapLabel = document.querySelector(".ride-title");
    let mapTitle = document.querySelector(".title-map");
    if (mapLabel) {
	  mapLabel.addEventListener('input', event => {
	    if (mapLabel.value.length >= 1) {
	      mapTitle.style.display = "initial";
	    }
	    else {
	      mapTitle.style.display = "none";
	    }
	  });	
    }
});

  // if .ride-title is empty, display:none(.map-title)

export {switchToCheckout};
