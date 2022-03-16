let map;
let markers = [];

const setListener = () => {
  document
    .querySelectorAll(".canchas__individualName")
    .forEach((canchaName, index) => {
      canchaName.addEventListener("click", () => {
        google.maps.event.trigger(markers[index], "click");
      });
    });
};

const displayCanchaList = () => {
  let canchaHTML = "";
  canchas.forEach((cancha) => {
    canchaHTML += `<h4 class= 'canchas__individualName'>${cancha.name} </h4>`;
  });
  document.getElementById("canchas__name").innerHTML = canchaHTML;
};

const createMarker = (coord, name, phone, price) => {
  let html = `<div>
    <h2>${name}</h2>
    <h3>Tel: ${phone}</h3>
    <h3>Precio: ${price}</h3>
    </div>`;

  const marker = new google.maps.Marker({
    position: coord,
    map: map,
    icon: "./icons/futbol5.ico",
  });
  google.maps.event.addListener(marker, "click", () => {
    InfoWindow.setContent(html);
    InfoWindow.open(map, marker);
  });
  markers.push(marker);
};

const createLocationMarkers = () => {
  let bounds = new google.maps.LatLngBounds();
  canchas.forEach((cancha) => {
    let coord = new google.maps.LatLng(cancha.lat, cancha.lng);
    let name = cancha.name;
    let phone = cancha.phone;
    let price = cancha.price;
    bounds.extend(coord);
    createMarker(coord, name, phone, price);
    map.fitBounds(bounds);
  });
};

function initMap() {
  let goya = { lat: -29.14409, lng: -59.265066 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: goya,
    zoom: 14,
    mapId: "f8e61b002a1322a0",
  });
  createLocationMarkers();
  // const marker= new google.maps.Marker({
  //     position: goya,
  //     map: map,
  // })

  InfoWindow = new google.maps.InfoWindow();
  displayCanchaList();
  setListener();
}
