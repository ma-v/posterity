const addfields = () => {
  let titleFrame = document.querySelector('.map-title');
  let speedField = document.querySelector('.ride-title');
  if (titleField) {
    titleField.addEventListener('keyup', (event) => {
      titleFrame.insertAdjactentHTML = ('beforeend',`<p class="legend-title">${titleField.value}</p>`);
    });
  }
};
