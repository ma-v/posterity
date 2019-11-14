const loadLoader = () => {
  const btnOrder = document.querySelector("#submit_map");
  if (btnOrder) {
    btnOrder.addEventListener('click', (event) => {
    btnOrder.remove();
    const divOrder = document.querySelector(".checkout");
    divOrder.insertAdjacentHTML('beforeend','<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>')
    });
  };
};

export { loadLoader };
