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

export {switchToCheckout};
