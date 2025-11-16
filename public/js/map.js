  mapboxgl.accessToken = mapToken;

  {/* let mapToken = mapToken;
  console.log(mapToken) */}

  const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12',
  // center: [79.01929970,18.11243720], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  center: listing.geometry.coordinates,
  zoom: 9 // starting zoom
  });

// console.log(coordinates);

// Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({color:"red"})
  .setLngLat(listing.geometry.coordinates)  //Listing.geometry.coordinates
  .setPopup( new mapboxgl.Popup({offset: 25})
  .setHTML(`<h4>${listing.location}</h4><p>exact location will be  provided after booking!</p>`))
  .addTo(map);
