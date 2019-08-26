import mapboxgl from 'mapbox-gl';

const injectCoordinates = (coordinates) => {
  const paragraphElement = document.getElementById('map');
  paragraphElement.innerText = `${coordinates.lat}, ${coordinates.lng}`;
  const mapboxRequest = document.getElementById('api_mapbox');
    mapboxRequest.addEventListener('click', (event) => {
    mapboxRequest.href = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${coordinates.lng},${coordinates.lat},10,14,4/1280x1280?access_token=pk.eyJ1IjoibWF0aGlhczIxODkiLCJhIjoiY2p6YjlsMTM1MDhjMTNncGg0M3M2Ymx3bCJ9.5DmaCa-Xj2popxvUOIeglQ&attribution=false&logo=false`;
     });
};

export { injectCoordinates};
