const ccMap = document.querySelector("#classics_challenge_map");
const yellowStyle = document.querySelector(".btn-cc-yellow");
const whiteStyle = document.querySelector(".btn-cc-white");

const changeCcStyle = () => {
  if (yellowStyle) {
    yellowStyle.addEventListener("click", event => {
      console.log("switching");
      const url = "https://api.mapbox.com/styles/v1/ma-v/cjzv3hkp30svs1cp5xeexv54g/static/2.3322219,48.856614,11.3/914x1280?access_token=pk.eyJ1IjoibWEtdiIsImEiOiJjazJ2cGRvNWUwNng0M21ucWQzcGFqY2g2In0.WBlEoavgZb1PPFxXqtKKqQ&logo=false";
      ccMap.style.backgroundImage = `url(${url})`;
    })
  }

  if (whiteStyle) {
    whiteStyle.addEventListener("click", event => {
      console.log("switching");
      const url = "https://api.mapbox.com/styles/v1/ma-v/ck2kdyw7z0e5t1ck0ffszwwh3/static/2.3322219,48.856614,11.3/914x1280?access_token=pk.eyJ1IjoibWEtdiIsImEiOiJjazJ2cGRvNWUwNng0M21ucWQzcGFqY2g2In0.WBlEoavgZb1PPFxXqtKKqQ&logo=false";
      ccMap.style.backgroundImage = `url(${url})`;
    })
  }
}

const addNameCc = () => {
  let frame = document.querySelector('#classics_challenge_map');
  if (frame){
    frame.insertAdjacentHTML('beforeend', '<div class="classics-challenge-name"><div class="name-map"></div><div>');
  }

  const addName = () => {
    let nameFrame = document.querySelector('.name-map');
    let nameField = document.querySelector('.ride-title');
    if (nameField) {
      nameField.addEventListener('keyup', (event) => {
        nameFrame.innerHTML = `<p class="legend-name">${nameField.value}</p>`;
      });
    }
  };
  addName();
};

export { changeCcStyle };
export { addNameCc };
