const switchToCheckout = () => {
	const orderButton = document.querySelector("#order-button");
	const backButton = document.querySelector("#back-button");
	const customBox = document.querySelector("#pills-customize-map");
	const checkout = document.querySelector("#pills-checkout");
	const mapFormat = document.querySelector("#map_format");

	const togglePills = () => {
		customBox.classList.toggle("show");
		customBox.classList.toggle("active");
		checkout.classList.toggle("show");
		checkout.classList.toggle("active");
	}

	if (orderButton) {
		orderButton.addEventListener("click", function() {
			togglePills();
			mapFormat.value = document.querySelector(".form-check :checked").value;
		});

		backButton.addEventListener("click", togglePills);
		}
	}

$(document).ready(function() {
    let mapLabel = document.querySelector(".ride-title");
    let mapTitle = document.querySelector(".map-title");
        console.log(mapTitle);

  mapLabel.addEventListener('input', event => {
    if (mapLabel.value.length >= 1) {
      mapTitle.style.display = "initial";
    }
    else {
      mapTitle.style.display = "none";
    }
  });
});

  // if .ride-title is empty, display:none(.map-title)

export {switchToCheckout};
