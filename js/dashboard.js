var name = localStorage.getItem("username");

document.querySelector(".login").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("username");
  window.location.href = "/login.html";
});

document.addEventListener("DOMContentLoaded", () => {
  if (name == "" || name == "null") {
    alert("You need to login to access this page!");
    window.location.href = "/login.html";
  } else {
    document.querySelector(".username-placeholder").innerHTML = name;
  }

  document
    .querySelector(".toolbar-toggle")
    .querySelector("a")
    .addEventListener("click", () => {
      document.querySelector(".toolbar").classList.toggle("toolbar-active");
      if (
        document.querySelector(".toolbar").classList.contains("toolbar-active")
      ) {
        document
          .querySelector(".toolbar-toggle")
          .querySelector("path").attributes.d.value =
          "M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z";
      } else {
        document
          .querySelector(".toolbar-toggle")
          .querySelector("path").attributes.d.value =
          "M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z";
      }
    });
});

// Map Settings
var map = L.map("map-db").setView([-6.362480397433, 106.82404411061857], 16);

L.tileLayer(
  "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=vPVqdMuRowKnXesdqmzl",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);

// Marker Settings
var markerIcon = L.Icon.extend({
  options: {
    shadowUrl: "css/images/marker-shadow.png",

    iconSize: [40, 40], // size of the icon
    shadowSize: [41, 41], // size of the shadow
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 39], // the same for the shadow
    popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
  },
});

var greenIcon = new markerIcon({ iconUrl: "css/images/marker-green.png" }),
  redIcon = new markerIcon({ iconUrl: "css/images/marker-red.png" }),
  yellowIcon = new markerIcon({ iconUrl: "css/images/marker-yellow.png" }),
  blueIcon = new markerIcon({ iconUrl: "css/images/marker-blue.png" }),
  blackIcon = new markerIcon({ iconUrl: "css/images/marker-black.png" });

// Area settings
var circleOne = L.circle([-6.362480397433, 106.82404411061857], {
  color: "green",
  fillColor: "#007820",
  fillOpacity: 0.3,
  // radius: 20000,
  radius: 200,
}).addTo(map);
var circleTwo = L.circle([-6.368080397433, 106.82404411061857], {
  color: "green",
  fillColor: "#007820",
  fillOpacity: 0.3,
  radius: 200,
}).addTo(map);
var circle_arr = [circleOne, circleTwo];

// Markers Configuration
var marker_1 = L.marker([-6.362, 106.824], { icon: blueIcon }).addTo(map);
var marker_2 = L.marker([-6.363, 106.823], { icon: blueIcon }).addTo(map);
var marker_3 = L.marker([-6.366, 106.825], { icon: blueIcon }).addTo(map);
var marker_4 = L.marker([-6.367, 106.824], { icon: blueIcon }).addTo(map);
var marker_arr = [marker_1, marker_2, marker_3, marker_4];

var api_url = [
  "https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=1",
  // "https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=1",
];

var panic_payload = [],
  marker_bool = [],
  data_arr = [];

for (i = 0; i < 4; i++) {
  // marker_bool.push(new Object({ out: [false, false], limit: false, panic: false }));
  marker_bool.push(
    new Object({
      out: new Array(circle_arr.length).fill(false),
      limit: false,
      panic: false,
    })
  );
}
var api_panic = [
  "https://api.thingspeak.com/channels/1662283/feeds.json?api_key=D8HQD2OAKS3BFQ5C&results=1",
  "https://api.thingspeak.com/channels/1662283/feeds.json?api_key=D8HQD2OAKS3BFQ5C&results=1",
  "https://api.thingspeak.com/channels/1662283/feeds.json?api_key=D8HQD2OAKS3BFQ5C&results=1",
];

var firstFetch = true;

function updateMarker() {
  api_url.forEach((url, i) => {
    data_arr[i] = JSON.parse(Get(url));
    data_arr[i] = data_arr[i].feeds[0];
  });

  // console.log("data_arr", data_arr);
  api_panic.forEach((url, i) => {
    var payload = JSON.parse(Get(url));
    if (firstFetch) {
      panic_payload[i] = payload;
      panic_payload[i] = panic_payload[i].feeds[0];
    } else if (
      panic_payload[i].created_at !== payload.feeds[0].created_at &&
      !firstFetch &&
      !marker_bool[i].panic
    ) {
      panic_payload[i] = payload;
      panic_payload[i] = panic_payload[i].feeds[0];
      marker_bool[i].panic = true;
      setTimeout(() => {
        marker_bool[i].panic = false;
      }, 60000);
    }
  });

  firstFetch = false;

  data_arr.forEach((el, i) => {
    // Set the status
    var personStatus = document.querySelector(`.person-${i + 1}`);
    personStatus.querySelector(".person-suhu").innerHTML = el.field3
      ? el.field3
      : "null";
    personStatus.querySelector(".person-spo2").innerHTML = el.field1
      ? el.field1
      : "null";
    personStatus.querySelector(".person-hr").innerHTML = el.field2
      ? el.field2
      : "null";
    personStatus.querySelector(".person-long").innerHTML = el.field6
      ? el.field6
      : "null";
    personStatus.querySelector(".person-lat").innerHTML = el.field5
      ? el.field5
      : "null";
    personStatus.querySelector(".person-panic").innerHTML = marker_bool[i].panic
      ? "ON"
      : "OFF";

    //Set the marker position
    marker_arr[i].setLatLng(L.latLng(data_arr[i].field5, data_arr[i].field6));

    //condition on params
    var fieldInt = [
      parseInt(el.field1),
      parseInt(el.field2),
      parseInt(el.field3),
    ];
    if (
      fieldInt[0] > 100 ||
      fieldInt[0] < 93 ||
      fieldInt[1] < 50 ||
      fieldInt[1] > 100 ||
      fieldInt[2] > 37.5
    )
      marker_bool[i].limit = true;
    else marker_bool[i].limit = false;
  });

  //Set marker popup
  marker_arr.forEach((marker, i) => {
    var markerLat = marker.getLatLng().lat;
    var markerLng = marker.getLatLng().lng;

    marker.bindPopup(
      `<b class='bold'>Device ${i + 1}</b>
        <br>Longitude:
        ${markerLat}
        <br>Latitude: 
        ${markerLng}
        <br>Temperature: 
        ${data_arr[i]?.field3}
        <br>Heart Rate: 
        ${data_arr[i]?.field2}
        <br>SPO2: 
        ${data_arr[i]?.field1}
        `
    );

    circle_arr.forEach((circle, a) => {
      var circleLat = circle._latlng.lat;
      var circleLng = circle._latlng.lng;
      var circleRad = circle.getRadius() / 100000;

      if (
        (markerLat - circleLat) * (markerLat - circleLat) +
          (markerLng - circleLng) * (markerLng - circleLng) >
        circleRad * circleRad
      ) {
        marker_bool[i].out[a] = true;
      } else {
        marker_bool[i].out[a] = false;
      }
    });

    var statusPersonDiv =
      document.querySelectorAll(".person-status")[i].classList;
    if (marker_bool[i].panic) {
      if (marker.getIcon() !== yellowIcon) {
        marker.setIcon(yellowIcon);
        statusPersonDiv.add("person-status-panic");
        statusPersonDiv.remove("person-status-out");
        statusPersonDiv.remove("person-status-limit");
      } else if (marker_bool[i].out.every((arr) => arr === true)) {
        marker.setIcon(redIcon);
        statusPersonDiv.remove("person-status-panic");
        statusPersonDiv.add("person-status-out");
      } else if (marker_bool[i].limit) {
        marker.setIcon(blackIcon);
        statusPersonDiv.remove("person-status-panic");
        statusPersonDiv.add("person-status-limit");
      } else {
        marker.setIcon(blueIcon);
        statusPersonDiv.remove("person-status-out");
        statusPersonDiv.remove("person-status-limit");
        statusPersonDiv.remove("person-status-panic");
      }
    } else if (marker_bool[i].limit) {
      marker.setIcon(blackIcon);
      statusPersonDiv.remove("person-status-out");
      statusPersonDiv.add("person-status-limit");
      statusPersonDiv.remove("person-status-panic");
    } else if (marker_bool[i].out.every((arr) => arr === true)) {
      marker.setIcon(redIcon);
      statusPersonDiv.add("person-status-out");
      statusPersonDiv.remove("person-status-limit");
      statusPersonDiv.remove("person-status-panic");
    } else {
      marker.setIcon(blueIcon);
      statusPersonDiv.remove("person-status-out");
      statusPersonDiv.remove("person-status-limit");
      statusPersonDiv.remove("person-status-panic");
    }
  });
  // console.log(marker_bool);
}
updateMarker();
setInterval(updateMarker, 1000);

function popNotification(deviceName, message, temp, so2, heart, lng, lat) {
  var newDiv = document.createElement("div");
  newDiv.className = "notification";

  var crossElement = document.createElement("a");
  var leftCross = document.createElement("div");
  var rightCross = document.createElement("div");

  crossElement.setAttribute("href", "#");
  crossElement.className = "cross";
  leftCross.className = "left-cross";
  rightCross.className = "right-cross";

  crossElement.appendChild(leftCross);
  crossElement.appendChild(rightCross);
  newDiv.appendChild(crossElement);

  newDiv
    .appendChild(document.createElement("h3"))
    .appendChild(document.createTextNode(`Warning on ${deviceName}!`));
  newDiv
    .appendChild(document.createElement("h4"))
    .appendChild(document.createTextNode(message));
  newDiv
    .appendChild(document.createElement("p"))
    .appendChild(
      document.createTextNode(
        `Temp: ${temp} | SO2: ${so2} | Heartbeat: ${heart}`
      )
    );
  newDiv
    .appendChild(document.createElement("p"))
    .appendChild(
      document.createTextNode(`Longitude: ${lng} | Latitude: ${lat}`)
    );

  var notificationsDiv = document.querySelector(".notifications");
  notificationsDiv.insertBefore(newDiv, notificationsDiv.lastChild);
  document.getElementById("notificationAudio").play();

  document.querySelectorAll(".cross").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      a.parentElement.remove();
      document.getElementById("notificationAudio").pause();
      document.getElementById("notificationAudio").currentTime = 0;
    });
  });
}

document.querySelector(".person-history").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("notificationAudio").pause();
  document.getElementById("notificationAudio").currentTime = 0;
  popNotification(
    "Device 3",
    "The heartbeat is too low!",
    40,
    40,
    40,
    -23.6,
    60.3
  );
});

document.querySelectorAll(".person-name").forEach((a) => {
  a.addEventListener("click", (e) => {
    var divs = Array.from(document.querySelectorAll(".person-status"));
    var el = e.target.parentElement;
    var elIndex = divs.indexOf(el);

    map.setView(
      [
        marker_arr[elIndex].getLatLng().lat,
        marker_arr[elIndex].getLatLng().lng,
      ],
      16
    );

    if (document.documentElement.clientWidth < 768) {
      document.querySelector(".toolbar").classList.toggle("toolbar-active");
      document
        .querySelector(".toolbar-toggle")
        .querySelector("path").attributes.d.value =
        "M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z";
    }
  });
});

console.log(document.documentElement.clientWidth);

// setTimeout(() =>{
//   marker_1.setLatLng([-6.360, 106.824])
//   marker_1.setIcon(yellowIcon)
//   updateMarker(marker_arr);
// }, 2000)

// var channel_1 = JSON.parse(Get('https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=2'));
// console.dir(channel_1);
// console.log(channel_1.feeds[channel_1.feeds.length-1].field1);
