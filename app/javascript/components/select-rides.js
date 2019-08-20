const selectRide = () => {
	const polyline = document.querySelector("#polyline");
	for (var i = 0; i <= 9; i++) {
  		const button_i = document.querySelector(`#activity_${i}`);
  		const polyline_i = button_i.dataset.polyline;
  		button_i.addEventListener("click", function() {
  			polyline.innerText = polyline_i
  		})
	}	
}

export {selectRide};
