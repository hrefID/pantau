function popNotification(
  currentDate,
  deviceName,
  message,
  data,
  id,
  color,
  outParams
) {
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
    .appendChild(document.createElement("h5"))
    .appendChild(document.createTextNode(id));
  newDiv
    .appendChild(document.createElement("h3"))
    .appendChild(
      document.createTextNode(`Warning on ${deviceName || "undefined"}!`)
    );
  newDiv
    .appendChild(document.createElement("h4"))
    .appendChild(document.createTextNode(message));
  newDiv.appendChild(document.createElement("p")).innerHTML = `<span class="${
    data.field3 > TEMP_PARAMS[1] && "text-warning"
  }">Temp: ${data.field3 || "null"}</span> | <span class="${
    (data.field1 > SPO2_PARAMS[1] || data.field1 < SPO2_PARAMS[0]) &&
    "text-warning"
  }">SpO2: ${data.field1 || "null"}</span> | <span class="${
    (data.field2 > HR_PARAMS[1] || data.field2 < HR_PARAMS[0]) && "text-warning"
  }">Heartbeat: ${data.field2 || "null"}</span>`;

  newDiv.appendChild(document.createElement("p")).innerHTML = `<span class="${
    outParams && "text-warning"
  }">Longitude: ${data.field6 || "null"} | Latitude: ${
    data.field5 || "null"
  }</span>`;

  newDiv
    .appendChild(document.createElement("a"))
    .appendChild(
      document.createTextNode(
        `${timeFormat(currentDate.getHours())} : ${timeFormat(
          currentDate.getMinutes()
        )} : ${timeFormat(
          currentDate.getSeconds()
        )} - ${currentDate.getDate()} ${
          monthNames[currentDate.getMonth()]
        } ${currentDate.getFullYear()} `
      )
    );
  var dateElement =
    newDiv.querySelectorAll("a")[newDiv.querySelectorAll("a").length - 1];
  dateElement.classList.add("date");
  dateElement.setAttribute("href", "#");
  dateElement.style.backgroundColor = color;

  var notificationsDiv = document.querySelector(".notifications");
  notificationsDiv.querySelectorAll("div").length === 0
    ? notificationsDiv.insertBefore(newDiv, notificationsDiv.lastChild)
    : notificationsDiv.insertBefore(
        newDiv,
        notificationsDiv.lastChild.nextSibling
      );

  document.getElementById("notificationAudio").pause();
  document.getElementById("notificationAudio").currentTime = 0;
  document.getElementById("notificationAudio").play();

  document.querySelectorAll(".cross").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      removeNotification(a);
      document.getElementById("notificationAudio").pause();
      document.getElementById("notificationAudio").currentTime = 0;
    });
  });

  document.querySelectorAll(".date").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      var id = parseInt(a.parentElement.querySelector("h5").innerHTML);
      var indexID = devices_arr.map((device) => device.id).indexOf(id);
      goToMarker(indexID);
    });
  });
}

var removeNotification = (a) => {
  var id = parseInt(a.parentElement.querySelector("h5").innerHTML);
  var indexID = devices_arr.map((device) => device.id).indexOf(id);
  marker_bool[indexID].notif = false;
  devices_arr[indexID].active
    ? (marker_bool[indexID].notifCount = 0)
    : (marker_bool[indexID].notifCount = NOTIFICATION_STALE_DURATION);
  a.parentElement.remove();
};

// popup notification on history device 0 click (development)
// document
//   .querySelectorAll(".person-history")[0]
//   .addEventListener("click", (e) => {
//     e.preventDefault();
//     document.getElementById("notificationAudio").pause();
//     document.getElementById("notificationAudio").currentTime = 0;
//     popNotification(
//       new Date(),
//       "Device 3",
//       "Parameter di luar limit!",
//       40,
//       40,
//       40,
//       -23.6,
//       60.3
//     );
//   });
