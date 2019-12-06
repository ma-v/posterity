const loadLoader = () => {
  const btnOrder = document.querySelector("#submit_map");
  if (btnOrder) {
    btnOrder.addEventListener('click', (event) => {
    btnOrder.remove();
    const divOrder = document.querySelector(".checkout");
    divOrder.insertAdjacentHTML('beforeend','<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>')
    });
  };

  const btnCcOrder = document.querySelector("#submit_cc_map");
  if (btnCcOrder) {
    btnCcOrder.addEventListener('click', (event) => {
      btnCcOrder.remove();
      const divOrder = document.querySelector(".checkout");
      divOrder.insertAdjacentHTML('beforeend','<div class="spinner-border text-info" role="status"><span class="sr-only">Loading...</span></div>')
    });
  };
};

export { loadLoader };
