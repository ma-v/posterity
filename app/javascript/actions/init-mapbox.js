const initMapbox = () => {

  document.map = L.map('mapid').setView([43.305, -1.5], 8);
  if (document.map) {

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
      id: 'mapbox.satellite',
      accessToken: 'pk.eyJ1IjoibWF0aGlhczIxODkiLCJhIjoiY2p6YjlsMTM1MDhjMTNncGg0M3M2Ymx3bCJ9.5DmaCa-Xj2popxvUOIeglQ'
    }).addTo(document.map);
  }
};

export { initMapbox };