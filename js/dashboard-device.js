// Map Settings
// var map = L.map("map-db").setView([-6.274997, 106.844044], 16); // production
var map = L.map("map-db").setView([-6.362480397433, 106.82404411061857], 16); // development

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

var panic_payload = [],
  data_arr = [],
  marker_bool = [],
  marker_arr = [],
  circle_arr = [],
  firstFetch = true;

// Markers & Circle for Development!!!
// var marker_1 = L.marker([-6.36, 106.824], { icon: blueIcon });
// var marker_2 = L.marker([-6.363, 106.823], { icon: blueIcon });
// var marker_3 = L.marker([-6.366, 106.825], { icon: blueIcon });
// var marker_4 = L.marker([-6.367, 106.824], { icon: blueIcon });
// var marker_arr_2 = [marker_1, marker_2, marker_3, marker_4];

// var circleOne = L.circle([-6.36, 106.824], new Object(circleOption))
// var circleTwo = L.circle([-6.36, 106.824], new Object(circleOption))
// var circleThree = L.circle([-6.36, 106.824], new Object(circleOption))
// var circleFour = L.circle([-6.36, 106.824], new Object(circleOption))
// var circle_arr_2 = [circleOne, circleTwo, circleThree, circleFour]

devices_arr.forEach((device, i) => {
  var link = device.history_url;
  var name = device.device_name;
  document
    .querySelectorAll(".person-status")
    [i].querySelector(".person-history").href = link;
  document
    .querySelectorAll(".person-status")
    [i].querySelector(".person-name").innerHTML = name || "Undefined";

  // set marker bool initial value as condition params
  marker_bool.push(
    new Object({
      out: false,
      limit: false,
      panic: false,
      notif: false,
      notifCount: NOTIFICATION_STALE_DURATION,
      lastId: 0,
      inactiveCount: 0,
    })
  );

  // set marker & circle
  marker_arr.push(
    new Object(
      new L.marker(
        [-6.36 - Math.random() * 0.01, 106.82 + Math.random() * 0.01],
        { icon: blueIcon }
      )
    )
  );
  circle_arr.push(
    new Object(
      new L.circle([Math.random(), Math.random()], new Object(circleOption))
    )
  );
});

function updateMarker() {
  // update time from dashboard.js
  updateTime();

  // fetch apis
  devices_arr.forEach((device, i) => {
    var url = device.api_url;
    data_arr[i] = JSON.parse(Get(url));
    data_arr[i] = data_arr[i].feeds[0];

    if (firstFetch) {
      marker_bool[i].lastId = data_arr[i].entry_id;
    } else if (marker_bool[i].lastId !== data_arr[i].entry_id) {
      marker_bool[i].lastId = data_arr[i].entry_id;
      marker_bool[i].inactiveCount = 0;
      device.active = true;
    } else if (
      marker_bool[i].lastId === data_arr[i].entry_id &&
      device.active
    ) {
      marker_bool[i].inactiveCount = marker_bool[i].inactiveCount + 1;
    }

    // disable for inactive device
    if (marker_bool[i].inactiveCount >= INACTIVITY_DURATION) {
      marker_bool[i].inactiveCount = 0;
      device.active = false;
    }
  });
  // console.log(inactiveCount)
  // console.log("data_arr", data_arr);

  devices_arr.forEach((device, i) => {
    var url = device.api_panic;
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
      // TO DO PANIC BUTTON NOTIFICATION
      setTimeout(() => {
        marker_bool[i].panic = false;
      }, 60000);
    }
  });

  firstFetch = false;
  // console.log(panic_payload)

  // update UI on device active status
  devices_arr.forEach((device, i) => {
    var personDiv = document.querySelectorAll(".person-status")[i];
    if (device.active && personDiv.classList.contains("hide")) {
      personDiv.classList.remove("hide");
      marker_arr[i].addTo(map);
      circle_arr[i].setLatLng(marker_arr[i].getLatLng());
      circle_arr[i].addTo(map);
    } else if (!device.active && !personDiv.classList.contains("hide")) {
      personDiv.classList.add("hide");
      marker_arr[i].remove();
      circle_arr[i].remove();
    }
  });

  data_arr.forEach((el, i) => {
    // Set the status
    var personStatus = document.querySelectorAll(".person-status")[i];
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

    // Set the marker position (enable for production, disable for development)
    marker_arr[i].setLatLng(L.latLng(data_arr[i].field5, data_arr[i].field6));

    //condition on limit params
    var fieldInt = [
      // SPO2
      parseInt(el.field1),
      // HEART RATE
      parseInt(el.field2),
      // TEMPERATURE
      parseInt(el.field3),
    ];

    if (
      (SPO2_PARAMS[0] && fieldInt[0] < SPO2_PARAMS[0]) ||
      (SPO2_PARAMS[1] && fieldInt[0] > SPO2_PARAMS[1]) ||
      (HR_PARAMS[0] && fieldInt[1] < HR_PARAMS[0]) ||
      (HR_PARAMS[1] && fieldInt[1] > HR_PARAMS[1]) ||
      (TEMP_PARAMS[0] && fieldInt[2] < TEMP_PARAMS[0]) ||
      (TEMP_PARAMS[1] && fieldInt[2] > TEMP_PARAMS[1])
    )
      marker_bool[i].limit = true;
    else marker_bool[i].limit = false;
  });

  //Set marker popup
  marker_arr.forEach((marker, i) => {
    var markerLat = marker.getLatLng().lat;
    var markerLng = marker.getLatLng().lng;

    marker.bindPopup(
      `<b class='bold'>${devices_arr.name}</b>
        <br>Temperature: 
        ${data_arr[i]?.field3 || "null"}
        <br>Heart Rate: 
        ${data_arr[i]?.field2 || "null"}
        <br>SPO2: 
        ${data_arr[i]?.field1 || "null"}
        `
    );

    var circle = circle_arr[i];
    var circleLat = circle._latlng.lat;
    var circleLng = circle._latlng.lng;
    var circleRad = circle.getRadius() / 100000;

    if (
      (markerLat - circleLat) * (markerLat - circleLat) +
        (markerLng - circleLng) * (markerLng - circleLng) >
      circleRad * circleRad
    ) {
      marker_bool[i].out = true;
    } else {
      marker_bool[i].out = false;
    }

    var statusPersonDiv =
      document.querySelectorAll(".person-status")[i].classList;
    if (marker_bool[i].panic) {
      if (marker.getIcon() !== yellowIcon) {
        marker.setIcon(yellowIcon);
        statusPersonDiv.add("person-status-panic");
        statusPersonDiv.remove("person-status-out");
        statusPersonDiv.remove("person-status-limit");
        statusPersonDiv.remove("person-status-limit-out");
      } else if (marker_bool[i].limit && marker_bool[i].out) {
        marker.setIcon(orangeIcon);
        statusPersonDiv.remove("person-status-panic");
        statusPersonDiv.add("person-status-limit-out");
      } else if (marker_bool[i].out) {
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
        statusPersonDiv.remove("person-status-limit-out");
      }
    } else if (marker_bool[i].limit && marker_bool[i].out) {
      marker.setIcon(orangeIcon);
      statusPersonDiv.add("person-status-limit-out");
      statusPersonDiv.remove("person-status-out");
      statusPersonDiv.remove("person-status-panic");
      statusPersonDiv.remove("person-status-limit");
    } else if (marker_bool[i].limit) {
      marker.setIcon(blackIcon);
      statusPersonDiv.add("person-status-limit");
      statusPersonDiv.remove("person-status-out");
      statusPersonDiv.remove("person-status-panic");
      statusPersonDiv.remove("person-status-limit-out");
    } else if (marker_bool[i].out) {
      marker.setIcon(redIcon);
      statusPersonDiv.add("person-status-out");
      statusPersonDiv.remove("person-status-limit");
      statusPersonDiv.remove("person-status-panic");
      statusPersonDiv.remove("person-status-limit-out");
    } else {
      marker.setIcon(blueIcon);
      statusPersonDiv.remove("person-status-out");
      statusPersonDiv.remove("person-status-limit");
      statusPersonDiv.remove("person-status-panic");
      statusPersonDiv.remove("person-status-limit-out");
    }

    // notification pop
    if (
      !marker_bool[i].notif &&
      (marker_bool[i].limit || marker_bool[i].out) &&
      marker_bool[i].notifCount >= NOTIFICATION_STALE_DURATION &&
      devices_arr[i].active
    ) {
      popNotification(
        new Date(),
        devices_arr[i].device_name,
        PARAMS_MSG,
        data_arr[i],
        devices_arr[i].id
      );
      marker_bool[i].notif = true;
      marker_bool[i].notifCount = 0;
      console.log(marker_bool);
    } else if (!marker_bool[i].notif && devices_arr[i].active) {
      marker_bool[i].notifCount = marker_bool[i].notifCount + 1;
    }
  });
}
updateMarker();
setInterval(updateMarker, 1000);

// TESTING ON DEVELOPMENT
// setTimeout(() => (devices_arr[0].active = true), 5000);
// setTimeout(() => (devices_arr[1].active = true), 8000);
// setTimeout(() => (devices_arr[2].active = true), 11000);
// setTimeout(() => (devices_arr[3].active = true), 14000);
// setTimeout(() => marker_arr[0].setLatLng([-6.363, 106.824]), 8000)
// setTimeout(() => devices_arr[0].active = false, 18000)
// setTimeout(() => devices_arr[1].active = false, 12000)

// go to marker if the name of device is clicked
document.querySelectorAll(".person-name").forEach((a) => {
  a.addEventListener("click", (e) => {
    var divs = Array.from(document.querySelectorAll(".person-status"));
    var el = e.target.parentElement;
    var elIndex = divs.indexOf(el);

    if (marker_arr[elIndex]) {
      map.setView(
        [
          marker_arr[elIndex].getLatLng().lat,
          marker_arr[elIndex].getLatLng().lng,
        ],
        16
      );
    } else alert("The device is not available");

    if (document.documentElement.clientWidth < 768) {
      document.querySelector(".toolbar").classList.toggle("toolbar-active");
      document
        .querySelector(".toolbar-toggle")
        .querySelector("path").attributes.d.value =
        "M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z";
    }
  });
});

// console.log(document.documentElement.clientWidth);

// setTimeout(() =>{
//   marker_1.setLatLng([-6.360, 106.824])
//   marker_1.setIcon(yellowIcon)
//   updateMarker(marker_arr);
// }, 2000)

// var channel_1 = JSON.parse(Get('https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=2'));
// console.dir(channel_1);
// console.log(channel_1.feeds[channel_1.feeds.length-1].field1);
